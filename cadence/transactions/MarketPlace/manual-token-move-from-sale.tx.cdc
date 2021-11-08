import WordTokenContract, WOTContract, MarketplaceContract002 from 0x1f7da62a915f01c7


/*
v1
*/

transaction (tokenID: UInt64){

    prepare(acct: AuthAccount) {
        let saleRef = acct.borrow<&MarketplaceContract002.SaleCollection>(from: MarketplaceContract002.SaleCollectionStoragePath)
            ?? panic("Impossible d'emprunter la référence de vente du AuthAccount")

        let capability = acct.getCapability<&{WordTokenContract.WordTokenCollectionPublic}>(WordTokenContract.CollectionPublicPath)

        let receiverRef = capability.borrow()
            ?? panic("Could not borrow the receiver reference")

        receiverRef.deposit(token: <- saleRef.withdraw(tokenID: tokenID))
    }
}