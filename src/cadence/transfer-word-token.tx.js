export const TRANSFER_WORD_TOKEN = `
import WordTokenContract from 0x1f7da62a915f01c7
import NonFungibleToken from 0x631e88ae7f1d7c20

transaction (receiverAddress: Address, wordTokenId: UInt64){

    let collection: @NonFungibleToken.Collection

    prepare(acct: AuthAccount) {
        self.collection <- WordTokenContract.createEmptyCollection()

        let collectionRef = acct
            .borrow<&WordTokenContract.Collection>(from: WordTokenContract.CollectionStoragePath)
            ?? panic("Impossible d'emprunter la référence à la Collection du propriétaire")

        self.collection.deposit(token: <-collectionRef.withdraw(withdrawID: wordTokenId))
    }

    execute {
        let recepteur = getAccount(receiverAddress)

        let receiverRef = recepteur
            .getCapability<&{WordTokenContract.WordTokenCollectionPublic}>(WordTokenContract.CollectionPublicPath)
            .borrow()
            ?? panic("Impossible d'emprunter la référence receiver")

        receiverRef.deposit(token: <-self.collection.withdraw(withdrawID: wordTokenId))

        destroy self.collection
    }
}
`