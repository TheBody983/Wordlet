import MarketplaceContract from 0x1f7da62a915f01c7

pub fun main(userAddress: Address): Bool {

    let wordlet = getAccount(0x1f7da62a915f01c7)
    let wordletCatalogRef = wordlet.getCapability<&{MarketplaceContract.SellerCatalog}>(/public/SellerCatalog)
        .borrow()
        ?? panic("Could not borrow wordlet sales catalog reference")

    return wordletCatalogRef.isInCatalog(sellerAddress: userAddress)
}