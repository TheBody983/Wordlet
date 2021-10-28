import WordletContract from 0x1f7da62a915f01c7

pub fun main(addr: Address, id: UInt64) : {String : String} {
    let nftOwner = getAccount(addr)

    let capability = nftOwner.getCapability<&{WordletContract.NFTReceiver}>(/public/NFTReceiver)

    let receiverRef = capability.borrow()
        ?? panic("Impossible d'emprunter la référence Reciever")

    return receiverRef.getMetadata(id: id)
}