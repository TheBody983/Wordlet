import WordTokenContract from 0x1f7da62a915f01c7

pub fun main(address: Address) : [UInt64]? {

	let acct = getAccount(address)
	let cap = acct.getCapability<&{WordTokenContract.WordTokenCollectionPublic}>(WordTokenContract.CollectionPublicPath)

	if(cap.check()){
		let ref = cap.borrow()
			?? panic("Could not borrow the provider reference")    
		return ref.getIDs()
	}
	return nil
}