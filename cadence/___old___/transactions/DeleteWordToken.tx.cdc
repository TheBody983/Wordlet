import WordletContract from 0x1f7da62a915f01c7

/*
Supprime un wordToken dans la collection du signataire a partir de son identifiant
 */

transaction (wordTokenId: UInt64){

    let collection: @WordletContract.Collection
    let metadata: {String: String}

    prepare(account: AuthAccount) {

        self.collection <- WordletContract.createEmptyCollection()

        let collectionRef = account.borrow<&WordletContract.Collection>(from: /storage/NFTCollection)
            ?? panic("Impossible d'emprunter la référence à la Collection du propriétaire")

        self.metadata = collectionRef.getMetadata(id: wordTokenId)

        self.collection.deposit(token: <- collectionRef.withdraw(withdrawID: wordTokenId), metadata: self.metadata)
    }

    execute {

        destroy self.collection

        log("NFT supprimé")

    }

}