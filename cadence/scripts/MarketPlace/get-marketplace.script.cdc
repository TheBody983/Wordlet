import MarketplaceContract002 from 0x1f7da62a915f01c7

pub fun main(address: Address) : [UInt64]? {
    let owner = getAccount(address)
    let ref = owner.getCapability<&{MarketplaceContract002.SalePublic}>(MarketplaceContract002.SaleCollectionPublicPath).borrow()
        ?? panic("Could not borrow account nft sale collection reference")

    return ref.getIDs()
}
