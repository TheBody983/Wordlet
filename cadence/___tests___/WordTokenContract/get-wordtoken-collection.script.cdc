import WordTokenContract from 0x1f7da62a915f01c7
import NonFungibleToken from 0x631e88ae7f1d7c20

pub fun main(addr: Address) : [UInt64]? {
    let owner = getAccount(addr)
    let ref = owner.getCapability<&{WordTokenContract.WordTokenCollectionPublic}>(WordTokenContract.CollectionPublicPath).borrow()

    return ref?.getIDs()
        
    
}