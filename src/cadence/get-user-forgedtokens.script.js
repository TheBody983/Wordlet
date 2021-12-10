export const GET_USER_FORGEDTOKENS=`
import ForgedTokenContract from 0x1f7da62a915f01c7

pub fun main(address: Address) : [UInt64]? {

	let acct = getAccount(address)  
	let cap = acct.getCapability<&{ForgedTokenContract.ForgedTokenCollectionPublic}>(ForgedTokenContract.CollectionPublicPath)

	if(cap.check()){
		let providerRef = cap.borrow()
			?? panic("Could not borrow the provider reference")        
		return providerRef.getIDs()
	}
	return nil
}
`