import WordTokenContract, WOTContract, MarketplaceContract002 from 0x1f7da62a915f01c7

/*
v1
*/

transaction (tokenId: UInt64, value: UFix64){

    prepare(acct: AuthAccount) {
        let sale = acct.borrow<&MarketplaceContract002.SaleCollection>(from: MarketplaceContract002.SaleCollectionStoragePath)
            ?? panic("Impossible d'emprunter la ressource de vente")

        let collectionRef = acct.borrow<&WordTokenContract.Collection>(from: WordTokenContract.CollectionStoragePath)
            ?? panic("Impossible d'emprunter la référence à la collection")

        sale.listForSale(token: <- collectionRef.withdraw(withdrawID: tokenId), price: value)
    }
}