import WordTokenContract from 0x1f7da62a915f01c7

pub fun main(address: Address) : [UInt64]? {
	let owner = getAccount(address)
	let ref = owner.getCapability<&{WordTokenContract.WordTokenCollectionPublic}>(WordTokenContract.CollectionPublicPath).borrow()
		?? panic("Could not borrow account nft collection reference")
		
	return ref.getIDs()
}