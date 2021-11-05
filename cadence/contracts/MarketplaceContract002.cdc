import WOTContract, WordTokenContract from 0x1f7da62a915f01c7
import FungibleToken from 0x9a0766d93b6608b7
import NonFungibleToken from 0x631e88ae7f1d7c20


pub contract MarketplaceContract002 {
    pub event ForSale(id: UInt64, price: UFix64)
    pub event PriceChanged(id: UInt64, newPrice: UFix64)
    pub event TokenPurchased(id: UInt64, price: UFix64)
    pub event SaleWithdrawn(id: UInt64)

    pub let SaleCollectionStoragePath: StoragePath
    pub let SaleCollectionPublicPath: PublicPath
    pub let SellerListStoragePath: StoragePath
    pub let SellerListPublicPath: PublicPath

    pub resource interface SalePublic {
        pub fun purchase(tokenID: UInt64, recipient: &AnyResource{WordTokenContract.WordTokenCollectionPublic}, buyTokens: @WOTContract.Vault)
        pub fun idPrice(tokenID: UInt64): UFix64?
        pub fun getIDs(): [UInt64]
    }

    pub resource SaleCollection: SalePublic {
        pub var forSale: @{UInt64: NonFungibleToken.NFT}

        pub var prices: {UInt64: UFix64}

        access(account) let ownerVault: Capability<&AnyResource{FungibleToken.Receiver}>

        init (vault: Capability<&AnyResource{FungibleToken.Receiver}>) {
            self.forSale <- {}
            self.ownerVault = vault
            self.prices = {}
        }

        pub fun withdraw(tokenID: UInt64): @NonFungibleToken.NFT {
            self.prices.remove(key: tokenID)
            let token <- self.forSale.remove(key: tokenID) ?? panic("missing NFT")
            return <-token
        }

        pub fun listForSale(token: @NonFungibleToken.NFT, price: UFix64) {
            let id = token.id

            self.prices[id] = price

            let oldToken <- self.forSale[id] <- token
            destroy oldToken

            emit ForSale(id: id, price: price)
        }

        pub fun changePrice(tokenID: UInt64, newPrice: UFix64) {
            self.prices[tokenID] = newPrice

            emit PriceChanged(id: tokenID, newPrice: newPrice)
        }

        pub fun purchase(tokenID: UInt64, recipient: &AnyResource{WordTokenContract.WordTokenCollectionPublic}, buyTokens: @WOTContract.Vault) {
            pre {
                self.forSale[tokenID] != nil && self.prices[tokenID] != nil:
                    "No token matching this ID for sale!"
                buyTokens.balance >= (self.prices[tokenID] ?? 0.0):
                    "Not enough tokens to by the NFT!"
            }

            let price = self.prices[tokenID]!
            
            self.prices[tokenID] = nil

            let vaultRef = self.ownerVault.borrow()
                ?? panic("Could not borrow reference to owner token vault")
            
            vaultRef.deposit(from: <-buyTokens)

            emit TokenPurchased(id: tokenID, price: price)
        }

        pub fun idPrice(tokenID: UInt64): UFix64? {
            return self.prices[tokenID]
        }

        pub fun getIDs(): [UInt64] {
            return self.forSale.keys
        }

        destroy() {
            destroy self.forSale
        }
    }

    pub fun createSaleCollection(ownerVault: Capability<&AnyResource{FungibleToken.Receiver}>): @SaleCollection {
        return <- create SaleCollection(vault: ownerVault)
    }

    // interface publique du catalogue
    pub resource interface SellerCatalog {
        pub fun addSeller(sellerAcct: AuthAccount)
        pub fun removeSeller(sellerAcct: AuthAccount)
        pub fun isInCatalog(sellerAddress: Address): Bool
        pub fun getSellerList(): [Address]
    }

    // catalogue de tous les vendeurs
    pub resource SellerList: SellerCatalog {

        pub var sellerAddresses: [Address]

        init() {
            self.sellerAddresses = [0x1f7da62a915f01c7]
        }

        pub fun addSeller(sellerAcct: AuthAccount){
            if !self.sellerAddresses.contains(sellerAcct.address){
                self.sellerAddresses.append(sellerAcct.address)
            }
        }

        pub fun removeSeller(sellerAcct: AuthAccount){
            var i = self.sellerAddresses.length-1
            while i >= 0 {
                if self.sellerAddresses[i] == sellerAcct.address {
                    self.sellerAddresses.remove(at: i)
                }
                i = i - 1
            }
        }

        pub fun isInCatalog(sellerAddress: Address): Bool {
            return self.sellerAddresses.contains(sellerAddress)
        }

        pub fun getSellerList(): [Address] {
            return self.sellerAddresses!
        }

    }

    // Créé puis retourne une liste vide
    pub fun createSellerList(): @SellerList {
        return <- create SellerList()
    }

    init() {
        // Path Setting
        self.SaleCollectionStoragePath = /storage/WordletSaleCollection
        self.SaleCollectionPublicPath = /public/WordletSaleCollection
        self.SellerListStoragePath = /storage/WordletSellerList
        self.SellerListPublicPath = /public/WordletSellerList

        let receiver = self.account.getCapability<&{FungibleToken.Receiver}>(WOTContract.ReceiverPublicPath)
        self.account.save(<-self.createSaleCollection(ownerVault: receiver), to: self.SaleCollectionStoragePath)
        self.account.link<&SaleCollection{SalePublic}>(self.SaleCollectionPublicPath, target: self.SaleCollectionStoragePath)

        self.account.save(<-self.createSellerList(), to: self.SellerListStoragePath)
        self.account.link<&SellerList{SellerCatalog}>(self.SellerListPublicPath, target: self.SellerListStoragePath)

    }
}