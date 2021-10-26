import WordTokenContract from 0x1f7da62a915f01c7
import NonFungibleToken from 0x631e88ae7f1d7c20

transaction {
    let address: Address

    prepare(acct: AuthAccount) {
        self.address = acct.address

        let wordTokenCollection <- WordTokenContract.createEmptyCollection()

        acct.save<@WordTokenContract.Collection>( <- wordTokenCollection, to: WordTokenContract.CollectionStoragePath)

        acct.link<&WordTokenContract.Collection{WordTokenContract.WordTokenCollectionPublic}>(WordTokenContract.CollectionPublicPath, target: WordTokenContract.CollectionStoragePath)
    }

    post {
        getAccount(self.address).getCapability<&WordTokenContract.Collection{WordTokenContract.WordTokenCollectionPublic}>(WordTokenContract.CollectionPublicPath)
            .check():  
            "Référence CollectionPublic de Collection créée incorrectement"
    }
}