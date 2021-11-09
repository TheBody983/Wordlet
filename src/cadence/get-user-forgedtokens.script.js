export const GET_USER_FORGEDTOKENS=`
import ForgedTokenContract from 0x1f7da62a915f01c7

pub fun main(address: Address) : [UInt64] {

    // Voir les NFT de address
    let nftOwner = getAccount(address)  
    let providerRef = nftOwner.getCapability<&{ForgedTokenContract.ForgedTokenCollectionPublic}>(ForgedTokenContract.CollectionPublicPath)
        .borrow()
        ?? panic("Could not borrow the provider reference")        

    return providerRef.getIDs()
}`