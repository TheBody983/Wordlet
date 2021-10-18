import WordletContract from 0x1f7da62a915f01c7

pub fun main(address: Address) : [UInt64] {

    // Voir les NFT de address
    let nftOwner = getAccount(address)  
    let capability = nftOwner.getCapability<&{WordletContract.NFTReceiver}>(/public/NFTReceiver)

    let receiverRef = capability.borrow()
        ?? panic("Could not borrow the receiver reference")

    return receiverRef.getIDs()
}