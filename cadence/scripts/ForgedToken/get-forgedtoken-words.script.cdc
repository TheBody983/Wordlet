import WordTokenContract, ForgedTokenContract from 0x1f7da62a915f01c7

pub fun main(address: Address, id: UInt64) : String? {

	let nftOwner = getAccount(address)

	if let ref = nftOwner.getCapability<&{ForgedTokenContract.ForgedTokenCollectionPublic}>(ForgedTokenContract.CollectionPublicPath).borrow() {
		if let forgedToken = ref.borrowForgedToken(id: id) {
			var forgedTokenWords: String = ""
			var i: UInt64 = 0
			while i < UInt64(forgedToken.forged.length) {
				let wordToken: &WordTokenContract.NFT = &forgedToken.forged[i] as &WordTokenContract.NFT
				forgedTokenWords = forgedTokenWords.concat(wordToken.word).concat(" ")
				i = i + 1
			}
			return forgedTokenWords.slice(from: 0, upTo: forgedTokenWords.length-1)
		}
	}

	return nil
}