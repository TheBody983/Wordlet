import WordTokenContract from 0x1f7da62a915f01c7
import WOToken from 0x1f7da62a915f01c7

pub contract ForgeContract {

     // NFT - Event emis lors de la création du Contrat
    pub event ContractInitialized()

    // NFT - Event emis lorsqu'un token est retiré
    pub event Withdraw(id: UInt64, from: Address?)

    // NFT - Event emis lorsqu'un token est déposé
    pub event Deposit(id: UInt64, to: Address?)

    pub event Minted(id: UInt64, smithAcct: Address, forged: @{UInt64: WordTokenContract.NFT})

    // initialistaion des constantes de Path 
    pub let CollectionStoragePath: StoragePath
    pub let CollectionPublicPath: PublicPath
    pub let MinterStoragePath: StoragePath
    pub let MinterPublicPath: PublicPath

    // NFT - Le nombre total de WordToken en existence
    pub var totalSupply: UInt64

    pub resource NFT {

        pub let id: UInt64
        pub let forged: @{UInt64: WordTokenContract.NFT}
        pub let smith: Address

        pub var metadata: {String: String}

        // Par défaut, initialise le NFT avec son ID et des Métadonnées vides
        init(initID: UInt64, forged: @{UInt64: WordTokenContract.NFT}, smith: Address) {
            self.id = initID
            self.forged <- forged
            self.smith = smith
            self.metadata = {}
        }   

        pub fun getID(): UInt64 {
            return self.id
        }

        pub fun getDatas(): [AnyStruct] {
            return [
                {"forged": self.forged},
                {"smith": self.smith}
            ]
        }

        pub fun getMetadata(): {String: String} {
            return self.metadata
        }

        destroy(){
            destroy self.forged
        }
    }


    // NFT - Une Collection est soumise aux Interfaces
    //  NFT - Provider : withdraw
    //  NFT - Receiver : deposit
    //  NFT - CollectionPublic : deposit, getIDs et borrowNFT
    pub resource Collection: NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic {
        pub var ownedNFTs: @{UInt64: NFT} 


        init () {
            self.ownedNFTs <- {}
        }

        pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
            let token <- self.ownedNFTs.remove(key: withdrawID)
                ?? panic("Inpossible de retirer le WordToken : Il n'est pas dans la Collection")

            emit Withdraw(id: token.id, from:self.owner?.address)

            return <- token
        }

        pub fun deposit(token: @NonFungibleToken.NFT) {
            let token <- token as! @NFT

            let id: UInt64 = token.id

            let oldToken <- self.ownedNFTs[id] <- token

            emit Deposit(id: id, to: self.owner?.address)

            destroy oldToken
        }

        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
            return &self.ownedNFTs[id] as &NonFungibleToken.NFT
        }
        
        pub fun getSmith(id: UInt64): Address {
            return self.ownedNFTs[id]?.smith!
        }

        destroy() {
            destroy self.ownedNFTs
        }
    }
    
    pub resource interface CollectionInterface {
        pub fun getSmith(id: UInt64): Address
    }

    pub fun createEmptyCollection(): @Collection {
        return <- create Collection()
    }

    
    pub resource interface ForgeMinterInterface {
        pub fun mintNFT(smithAcct: AuthAccount, toForge: @{UInt64: WordTokenContract.NFT}): @NFT
    }

    pub resource NFTMinter : ForgeMinterInterface {

        pub var idCount: UInt64

        init() {
            self.idCount = 1
        }

        // Créé un nouveau Token et le retourne
        pub fun mintNFT(smithAcct: AuthAccount, toForge: @{UInt64: WordTokenContract.NFT}): @NFT {
            emit Minted(id: ForgeContract.totalSupply, smithAcct: smithAcct, forged: toForge)
            ForgeContract.totalSupply = ForgeContract.totalSupply + 1 as UInt64
            var newNFT <- create NFT(initID: self.idCount, forged: <- toForge, smith: smithAcct.address)
            self.idCount = self.idCount + 1 as UInt64
            return <- newNFT
        }
    }

    init() {
        // Path Setting
        self.CollectionStoragePath = /storage/ForgedTokenCollection
        self.CollectionPublicPath = /public/ForgedTokenCollection
        self.MinterStoragePath = /storage/ForgedTokenMinter
        self.MinterPublicPath = /public/ForgedTokenMinter

        self.account.save(<-self.createEmptyCollection(), to: self.CollectionStoragePath)
        self.account.link<&{CollectionInterface}>(self.CollectionPublicPath, target: self.CollectionStoragePath)
        
        self.account.save(<-create NFTMinter(), to: self.MinterStoragePath)
        self.account.link<&{ForgeMinterInterface}>(self.MinterPublicPath, target: self.MinterStoragePath)
    }
    
}

