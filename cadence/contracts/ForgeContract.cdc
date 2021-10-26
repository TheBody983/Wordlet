import WordletContract from 0x1f7da62a915f01c7
import WOToken from 0x1f7da62a915f01c7

pub contract ForgeContract {

    pub resource NFT {

        pub let id: UInt64
        pub let forged: @{UInt64: WordletContract.NFT}
        pub let smith: Address

        pub var metadata: {String: String}

        // Par défaut, initialise le NFT avec son ID et des Métadonnées vides
        init(initID: UInt64, forged: @{UInt64: WordletContract.NFT}, smith: Address) {
            self.id = initID
            self.forged <- forged
            self.smith = smith
            self.metadata = {}
        }   

        destroy(){
            destroy self.forged
        }
    }

    // Interface Publique : Les fonctions auxquelles tout le monde à accès (voué à changer)
    pub resource interface CollectionInterface {
        pub fun deposit(token: @NFT, metadata: {String : String})
        pub fun getIDs(): [UInt64]
        pub fun idExists(id: UInt64): Bool
        pub fun getMetadata(id: UInt64) : {String : String}
    }

    // Définition de la Collection de ForgedTokens d'un Utilisateur (voué à changer)
    pub resource Collection: CollectionInterface {
        pub var ownedNFTs: @{UInt64: NFT} // le @ signifie que ce champ est une ressource et que donc toutes les règles s'appliquant aux ressources s'appliquent aussi à ce champ
        pub var metadataObjs: {UInt64: { String : String }}

        // Initialisation à vide de la Collection d'objets
        init () {
            self.ownedNFTs <- {}
            self.metadataObjs = {}
        }

        // Retire un Token de la Collection
        pub fun withdraw(withdrawID: UInt64): @NFT {
            // Retire un Token de la Collection, revert si introuvable
            let token <- self.ownedNFTs.remove(key: withdrawID)!

            return <-token
        }

        // Depose un NFT et ses métadonnées dans la collection
        pub fun deposit(token: @NFT, metadata: {String : String}) {
            self.metadataObjs[token.id] = metadata
            self.ownedNFTs[token.id] <-! token
        }

        // Cherche si la Collection contient un Token
        pub fun idExists(id: UInt64): Bool {
            return self.ownedNFTs[id] != nil
        }

        // Retourne les IDs des Tokens présents dans la collection
        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        // Permet de mettre 0 jour les métadonnées d'un token (au cas où)
        pub fun updateMetadata(id: UInt64, metadata: {String: String}) {
            self.metadataObjs[id] = metadata
        }

        // Retourne les Métadonnées d'un Token
        pub fun getMetadata(id: UInt64): {String : String} {
            return self.metadataObjs[id]!
        }

        // Détruit la collection
        destroy() {
            destroy self.ownedNFTs
        }
    }
    
    // Créé puis retourne une Collection vide
    pub fun createEmptyCollection(): @Collection {
        return <- create Collection()
    }

    
    pub resource interface ForgeMinterInterface {
        pub fun mintNFT(smithAcct: AuthAccount, toForge: @{UInt64: WordletContract.NFT}): @NFT
    }

    pub resource NFTMinter : ForgeMinterInterface {

        pub var idCount: UInt64

        // Initialise les IDs à 1
        init() {
            self.idCount = 1
        }

        // Créé un nouveau Token et le retourne
        pub fun mintNFT(smithAcct: AuthAccount, toForge: @{UInt64: WordletContract.NFT}): @NFT {
            var newNFT <- create NFT(initID: self.idCount, forged: <- toForge, smith: smithAcct.address)
            self.idCount = self.idCount + 1 as UInt64
            return <- newNFT
        }
    }

    init() {
        // A l'initiailisation du Smart Contract :
        // - Stocke une collection vide de Tokens
        // - Publie une référence vers cette même colelction dans le stockage
        // - Stocke une ressource minter

        self.account.save(<-self.createEmptyCollection(), to: /storage/ForgeCollection)
        self.account.link<&{CollectionInterface}>(/public/ForgeCollectionInterface, target: /storage/ForgeCollection)
        
        self.account.save(<-create NFTMinter(), to: /storage/ForgeMinter)
        self.account.link<&{ForgeMinterInterface}>(/public/ForgeMinterInterface, target: /storage/ForgeMinter)
    }
    
}

