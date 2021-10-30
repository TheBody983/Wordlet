import NonFungibleToken from 0x631e88ae7f1d7c20
import WordTokenContract from 0x1f7da62a915f01c7

// ForgedTokenContract implémente l'interface officielle NonFungibleToken
// Ce qui impose tout ce qui est préfixé par NFT
// Ajoute aussi des vérifications pre (avant l'éxecution)
// et des vérifications post (après l'écxecution)
pub contract ForgedTokenContract: NonFungibleToken {

     // NFT - Event emis lors de la création du Contrat
    pub event ContractInitialized()

    // NFT - Event emis lorsqu'un token est retiré
    pub event Withdraw(id: UInt64, from: Address?)

    // NFT - Event emis lorsqu'un token est déposé
    pub event Deposit(id: UInt64, to: Address?)

    //pub event Minted(id: UInt64, smithAcct: Address, forged: @{UInt64: WordTokenContract.NFT})

    // initialistaion des constantes de Path 
    pub let CollectionStoragePath: StoragePath
    pub let CollectionPublicPath: PublicPath
    pub let MinterStoragePath: StoragePath
    pub let MinterPublicPath: PublicPath

    // NFT - Le nombre total de WordToken en existence
    pub var totalSupply: UInt64

    
    // NFT - Un WordToken est soumis à l'interface
    //  NFT - INFT : id: UInt64
    pub resource NFT: NonFungibleToken.INFT  {

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

        /* 
        pub fun getDatas(): [AnyStruct] {
            return [
                {"forged": self.forged},
                {"smith": self.smith}
            ]
        }
        */

        pub fun getMetadata(): {String: String} {
            return self.metadata
        }

        destroy(){
            destroy self.forged
        }
    }

    pub resource interface ForgedTokenCollectionPublic {
        pub fun deposit(token: @NonFungibleToken.NFT)
        pub fun getIDs(): [UInt64]
        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT
        pub fun borrowForgedToken(id: UInt64): &ForgedTokenContract.NFT? {
            post {
                (result == nil) || (result?.id == id):
                    "Impossible d'emprunter le Référence au WordToken: l'ID de la Référence retournée est incorrect"
            }
        }
    }

    // NFT - Une Collection est soumise aux Interfaces
    //  NFT - Provider : withdraw
    //  NFT - Receiver : deposit
    //  NFT - CollectionPublic : deposit, getIDs et borrowNFT
    pub resource Collection: NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, ForgedTokenCollectionPublic {

        pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT} 


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

        pub fun borrowForgedToken (id: UInt64): &ForgedTokenContract.NFT? {
            if self.ownedNFTs[id] != nil {
                let ref = &self.ownedNFTs[id] as auth &NonFungibleToken.NFT
                return ref as! &ForgedTokenContract.NFT
            } else {
                return nil
            }
        }

        destroy() {
            destroy self.ownedNFTs
        }
    }

    pub fun createEmptyCollection(): @Collection {
        return <- create Collection()
    }

    
    pub resource interface NFTMinterPublic {
        pub fun mintNFT(smithAcct: AuthAccount, toForge: @{UInt64: WordTokenContract.NFT}): @NFT
    }

    pub resource NFTMinter : NFTMinterPublic {

        // Créé un nouveau Token et le retourne
        pub fun mintNFT(smithAcct: AuthAccount, toForge: @{UInt64: WordTokenContract.NFT}): @NFT {
            //emit Minted(id: ForgedTokenContract.totalSupply, smithAcct: smithAcct, forged: toForge)
            ForgedTokenContract.totalSupply = ForgedTokenContract.totalSupply + 1 as UInt64
            var newNFT <- create NFT(initID: ForgedTokenContract.totalSupply, forged: <- toForge, smith: smithAcct.address)
            return <- newNFT
        }
    }

    init() {
        // Path Setting
        self.CollectionStoragePath = /storage/ForgedTokenCollection
        self.CollectionPublicPath = /public/ForgedTokenCollection
        self.MinterStoragePath = /storage/ForgedTokenMinter
        self.MinterPublicPath = /public/ForgedTokenMinter

        self.totalSupply = 0

        self.account.save(<-self.createEmptyCollection(), to: self.CollectionStoragePath)
        self.account.link<&Collection{ForgedTokenCollectionPublic}>(self.CollectionPublicPath, target: self.CollectionStoragePath)
        
        self.account.save(<-create NFTMinter(), to: self.MinterStoragePath)
        self.account.link<&{NFTMinterPublic}>(self.MinterPublicPath, target: self.MinterStoragePath)

        emit ContractInitialized()
    }
    
}

