import WordTokenContract from 0x1f7da62a915f01c7
import NonFungibleToken from 0x631e88ae7f1d7c20

transaction (mot: String, collection: String) {
    let collectionRef: &{WordTokenContract.WordTokenCollectionPublic}
    let minterRef: &WordTokenContract.NFTMinter

    prepare(acct: AuthAccount) {
        self.collectionRef = acct.getCapability<&{WordTokenContract.WordTokenCollectionPublic}>(WordTokenContract.CollectionPublicPath).borrow()
            ?? panic("Impossible d'emprunter la Référence CollectionPublic")

        self.minterRef = acct.borrow<&WordTokenContract.NFTMinter>(from: WordTokenContract.MinterStoragePath)
            ?? panic("Impossible d'emprunter la Référence Minter")
    }

    execute {
        let newNFT <- self.minterRef.mintNFT(word: mot, collection: collection)

        self.collectionRef.deposit(token: <-newNFT)
    }   
}