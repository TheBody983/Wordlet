import MarketplaceContract from 0x1f7da62a915f01c7

/*
 Ajoute le signataire au catalogue des vendeurs
 */

transaction (){

    prepare(account: AuthAccount) {

        let wordlet = getAccount(0x1f7da62a915f01c7)
        let wordletCatalogRef = wordlet.getCapability<&{MarketplaceContract.SellerCatalog}>(/public/SellerCatalog)
            .borrow()
            ?? panic("Could not borrow wordlet sales catalog reference")

        wordletCatalogRef.addSeller(sellerAddr: account.address)

    }
}