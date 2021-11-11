export const REMOVE_FROM_SELLER_CATALOG = `
import MarketplaceContract002 from 0x1f7da62a915f01c7

/*
 Retire le signataire au catalogue des vendeurs
 */

transaction (){

    prepare(account: AuthAccount) {

        let wordlet = getAccount(0x1f7da62a915f01c7)
        let wordletCatalogRef = wordlet.getCapability<&{MarketplaceContract002.SellerCatalog}>(MarketplaceContract002.SellerListPublicPath)
            .borrow()
            ?? panic("Could not borrow wordlet sales catalog reference")

        wordletCatalogRef.removeSeller(sellerAcct: account)

    }
}
`