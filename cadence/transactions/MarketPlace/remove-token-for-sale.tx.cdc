import WordTokenContract, MarketplaceContract002 from 0x1f7da62a915f01c7


/*
v1
*/

transaction (tokenID: UInt64){

    prepare(account: AuthAccount) {
        let saleRef = account.borrow<&MarketplaceContract002.SaleCollection>(from: MarketplaceContract002.SaleCollectionStoragePath)
            ?? panic("Impossible d'emprunter la référence de vente du AuthAccount")

        let collectionRef = account.borrow<&WordTokenContract.Collection>(from: WordTokenContract.CollectionStoragePath)
            ?? panic("Impossible d'emprunter la référence de la collection")

        collectionRef.deposit(token: <- saleRef.withdraw(tokenID: tokenID))
    }
}