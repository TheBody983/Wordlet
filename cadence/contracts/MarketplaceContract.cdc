import WordletContract from 0x1f7da62a915f01c7
import WOToken from 0x1f7da62a915f01c7

pub contract MarketplaceContract {
    pub event ForSale(id: UInt64, price: UFix64)
    pub event PriceChanged(id: UInt64, newPrice: UFix64)
    pub event TokenPurchased(id: UInt64, price: UFix64)
    pub event SaleWithdrawn(id: UInt64)

    pub resource interface SalePublic {
        pub fun purchase(tokenID: UInt64, recipient: &AnyResource{WordletContract.NFTReceiver}, buyTokens: @WOToken.Vault)
        pub fun idPrice(tokenID: UInt64): UFix64?
        pub fun getIDs(): [UInt64]
    }

    pub resource SaleCollection: SalePublic {
        pub var forSale: @{UInt64: WordletContract.NFT}

        pub var prices: {UInt64: UFix64}

        access(account) let ownerVault: Capability<&AnyResource{WOToken.Receiver}>

        init (vault: Capability<&AnyResource{WOToken.Receiver}>) {
            self.forSale <- {}
            self.ownerVault = vault
            self.prices = {}
        }

        pub fun withdraw(tokenID: UInt64): @WordletContract.NFT {
            self.prices.remove(key: tokenID)
            let token <- self.forSale.remove(key: tokenID) ?? panic("missing NFT")
            return <-token
        }

        pub fun listForSale(token: @WordletContract.NFT, price: UFix64) {
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

        pub fun purchase(tokenID: UInt64, recipient: &AnyResource{WordletContract.NFTReceiver}, buyTokens: @WOToken.Vault) {
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

            let wordlet = getAccount(0x1f7da62a915f01c7)!
            let cap = wordlet.getCapability<&{WordletContract.NFTReceiver}>(/public/NFTReceiver)!
            let metadataHarvester = cap.borrow()!

            let metadata = metadataHarvester.getMetadata(id: tokenID)
            recipient.deposit(token: <-self.withdraw(tokenID: tokenID), metadata: metadata)

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

    pub fun createSaleCollection(ownerVault: Capability<&AnyResource{WOToken.Receiver}>): @SaleCollection {
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

        self.account.save(<-self.createSellerList(), to: /storage/SellerList)
        self.account.link<&{SellerCatalog}>(/public/SellerCatalog, target: /storage/SellerList)

    }
}