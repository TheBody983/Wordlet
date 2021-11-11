import ForgedTokenContract from 0x1f7da62a915f01c7
import NonFungibleToken from 0x631e88ae7f1d7c20

transaction {

    let collection: @NonFungibleToken.Collection

    prepare(acct: AuthAccount) {
        self.collection <- ForgedTokenContract.createEmptyCollection()

        let collectionRef = acct
            .borrow<&ForgedTokenContract.Collection>(from: ForgedTokenContract.CollectionStoragePath)
            ?? panic("Impossible d'emprunter la référence à la Collection du propriétaire")

        self.collection.deposit(token: <-collectionRef.withdraw(withdrawID: 1))
    }

    execute {
        let recepteur = getAccount(0x1f7da62a915f01c7)

        let receiverRef = recepteur
            .getCapability<&{ForgedTokenContract.ForgedTokenCollectionPublic}>(ForgedTokenContract.CollectionPublicPath)
            .borrow()
            ?? panic("Impossible d'emprunter la référence receiver")

        receiverRef.deposit(token: <-self.collection.withdraw(withdrawID: 1))

        destroy self.collection
    }
}