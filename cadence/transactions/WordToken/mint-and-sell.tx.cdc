import WordTokenContract, MarketplaceContract002 from 0x1f7da62a915f01c7
import NonFungibleToken from 0x631e88ae7f1d7c20

// flow transactions send --network testnet --signer wordlet ./cadence/transactions/WordToken/mint-and-sell.tx.cdc '[\"Nouvvel\",\"Arrivage\"]' "original"

transaction (liste: [String], collection: String) {
    let collectionRef: &{WordTokenContract.WordTokenCollectionPublic}
    let minterRef: &WordTokenContract.NFTMinter
    let sale: &MarketplaceContract002.SaleCollection

    prepare(acct: AuthAccount) {
        self.collectionRef = acct.getCapability<&{WordTokenContract.WordTokenCollectionPublic}>(WordTokenContract.CollectionPublicPath).borrow()
            ?? panic("Impossible d'emprunter la Référence CollectionPublic")

        self.minterRef = acct.borrow<&WordTokenContract.NFTMinter>(from: WordTokenContract.MinterStoragePath)
            ?? panic("Impossible d'emprunter la Référence Minter")

        self.sale = acct.borrow<&MarketplaceContract002.SaleCollection>(from: MarketplaceContract002.SaleCollectionStoragePath)
            ?? panic("Impossible d'emprunter la ressource de vente")
    }

    execute {
        for mot in liste {
            let newNFT <- self.minterRef.mintNFT(word: mot, collection: collection)

            self.sale.listForSale(token: <- newNFT, price: 500.0)
        }
    }   
}