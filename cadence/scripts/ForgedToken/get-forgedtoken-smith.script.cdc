import ForgedTokenContract from 0x1f7da62a915f01c7

pub fun main(address: Address, id: UInt64) : Address? {

    let nftOwner = getAccount(address)

    if let ref = nftOwner.getCapability<&{ForgedTokenContract.ForgedTokenCollectionPublic}>(ForgedTokenContract.CollectionPublicPath).borrow() {
        if let token = ref.borrowForgedToken(id: id) {
            return token.smith
        }
    }

    return nil
}