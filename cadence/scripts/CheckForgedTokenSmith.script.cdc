import ForgeContract from 0x1f7da62a915f01c7

pub fun main(addr: Address, id: UInt64) : Address {
    let nftOwner = getAccount(addr)

    let capability = nftOwner.getCapability<&{ForgeContract.CollectionInterface}>(/public/ForgeCollectionInterface)

    let receiverRef = capability.borrow()
        ?? panic("Impossible d'emprunter la référence Reciever")

    return receiverRef.getSmith(id: id)
}