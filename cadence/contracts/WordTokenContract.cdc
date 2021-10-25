import NonFungibleToken from 0x631e88ae7f1d7c20

// WordTokenContract implémente l'interface officielle NonFungibleToken
// Ce qui impose tout ce qui est préfixé par NFT
// Ajoute aussi des vérifications pre (avant l'éxecution)
// et des vérifications post (après l'écxecution)
pub contract WordTokenContract: NonFungibleToken {
    
    // NFT - Event emis lors de la création du Contrat
    pub event ContractInitialized()

    // NFT - Event emis lorsqu'un token est retiré
    pub event Withdraw(id: UInt64, from: Address?)

    // NFT - Event emis lorsqu'un token est déposé
    pub event Deposit(id: UInt64, to: Address?)

    pub event Minted(id: UInt64, word: String, collection: String)

    // Chemin vers 
    pub let CollectionStoragePath: StoragePath
    pub let CollectionPublicPath: PublicPath
    pub let MinterStoragePath: StoragePath

    // NFT - Le nombre total de WordToken en existence
    pub var totalSupply: UInt64

    // NFT - Un WordToken est soumis à l'interface
    //  NFT - INFT : id: UInt64
    pub resource NFT: NonFungibleToken.INFT {

        pub let id: UInt64
        pub let word: String
        pub let collection: String

        pub var metadata: {String: String}

        init(initID: UInt64, word: String, collection: String) {
            self.id = initID
            self.word = String
            self.collection = collection
            self.metadata = {}
        }
    
        pub fun getDatas() [AnyStruct] {
            return [
                ["id", self.id],
                ["word", self.word],
                ["collection", self.collection],
                ["metadata", self.metadata]
            ]
        }

        destroy() {
            // WordTokenContract.totalSupply = WordletContract.totalSupply - UInt64(1)
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

        pub fun withdraw(withdrawID: UInt64): @NFT {
            let token <- self.ownedNFTs.remove(key: withdrawID)
                ?? panic("Inpossible de retirer le WordToken : Il n'est pas dans la Collection")

            emit Withdraw(id: token.id), from:self.owner?.address)

            return token
        }

        pub fun deposit(token: @NFT) {
            let token <- token as! @NFT

            let id: UInt64 = token.id

            let oldToken <- self.ownedNFTs[id] <- token

            emit Deposit(id: id, to: self.owner?.address)

            destroy oldToken
        }

        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        pub fun borrowNFT(id: UInt64): &NFT {
            return &self.ownedNFTs[id] as &NFT
        }

        destroy() {
            destroy self.ownedNFTs
        }
    }

    pub fun createEmptyCollection(): @Collection {
        return <- create Collection()
    }

    pub resource NFTMinter {
        
        pub fun mintNFT(word: String, collection: String) {
            emit Minted(id: WordTokenContract.totalSupply, word: word, collection: collection)
            var newNFT <- create NFT(initID: WordTokenContract.totalSupply, word: word, collection: collection)
            WordTokenContract.totalSupply = WordTokenContract.totalSupply + 1 as UInt64
            return <- newNFT
        }
    }

    init() {
        // Path Setting
        self.CollectionStoragePath = /storage/WordletCollection
        self.CollectionPublicPath = /public/WordletCollection
        self.MinterStoragePath = /storage/WordTokenMinter

        self.totalSupply = 0

        self.account.save(<-self.createEmptyCollection(), to: /storage/NFTCollection)
        self.account.link<&{CollectionPublic}>(/public/NFTReceiver, target: /storage/NFTCollection)

        self.account.save(<-create NFTMinter(), to: /storage/NFTMinter)

        emit ContractInitialized()
    }
}