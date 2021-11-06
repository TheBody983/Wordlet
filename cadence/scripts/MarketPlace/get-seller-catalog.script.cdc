import MarketplaceContract002 from 0x1f7da62a915f01c7

pub fun main(): [Address] {

    let wordlet = getAccount(0x1f7da62a915f01c7)
    let wordletCatalogRef = wordlet.getCapability<&{MarketplaceContract002.SellerCatalog}>(MarketplaceContract002.SellerListPublicPath)
        .borrow()
        ?? panic("Could not borrow wordlet sales catalog reference")

    return wordletCatalogRef.getSellerList()
}