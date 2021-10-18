import MarketplaceContract from 0x1f7da62a915f01c7

pub fun main(): [UInt64] {
    let account1 = getAccount(0x1f7da62a915f01c7)

    let acct1saleRef = account1.getCapability<&AnyResource{MarketplaceContract.SalePublic}>(/public/NFTSale)
        .borrow()
        ?? panic("Could not borrow acct1 nft sale reference")

    return acct1saleRef.getIDs()
}