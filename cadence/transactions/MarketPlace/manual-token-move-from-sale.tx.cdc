import WordletContract, WOToken, MarketplaceContract from 0x1f7da62a915f01c7


//import WordTokenContract, WOTContract, MarketplaceContract from 0x1f7da62a915f01c7


/*
v1
*/

transaction (tokenID: UInt64){

    prepare(acct: AuthAccount) {
        let saleRef = acct.borrow<&MarketplaceContract.SaleCollection>(from: /storage/NFTSale)
            ?? panic("Impossible d'emprunter la référence de vente du AuthAccount")

        let capability = acct.getCapability<&{WordletContract.NFTReceiver}>(/public/NFTReceiver)

        let receiverRef = capability.borrow()
            ?? panic("Could not borrow the receiver reference")

        let metadata = receiverRef.getMetadata(id: tokenID)

        receiverRef.deposit(token: <- saleRef.withdraw(tokenID: tokenID), metadata: metadata)
    }
}