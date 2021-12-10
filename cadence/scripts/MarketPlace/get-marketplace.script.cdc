import MarketplaceContract002 from 0x1f7da62a915f01c7

pub fun main(address: Address) : [UInt64]? {
	let acct = getAccount(address)
	let cap = acct.getCapability<&{MarketplaceContract002.SalePublic}>(MarketplaceContract002.SaleCollectionPublicPath)

	if(cap.check()){
		let ref = cap.borrow()
			?? panic("Could not borrow account nft sale collection reference")

		return ref.getIDs()
	}
	return nil
}
