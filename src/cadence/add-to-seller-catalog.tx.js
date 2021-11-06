export const ADD_TO_SELLER_CATALOG = `
import WOToken, WordletContract, MarketplaceContract002 from 0x1f7da62a915f01c7

/*
 Ajoute le signataire au catalogue des vendeurs
 */

transaction (){

    prepare(account: AuthAccount) {

        let wordlet = getAccount(0x1f7da62a915f01c7)
        let wordletCatalogRef = wordlet.getCapability<&{MarketplaceContract002.SellerCatalog}>(MarketplaceContract002.SellerListPublicPath)
            .borrow()
            ?? panic("Could not borrow wordlet sales catalog reference")

        wordletCatalogRef.addSeller(sellerAcct: account)

    }
}
`