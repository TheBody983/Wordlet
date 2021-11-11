import WordletContract from 0x1f7da62a915f01c7

pub fun main(id: UInt64) : {String : String} {
    
    let nftOwner = getAccount(0x1f7da62a915f01c7)  
    let capability = nftOwner.getCapability<&{WordletContract.NFTReceiver}>(/public/NFTReceiver)

    let receiverRef = capability.borrow()
        ?? panic("Could not borrow the receiver reference")

    return receiverRef.getMetadata(id: id)
}