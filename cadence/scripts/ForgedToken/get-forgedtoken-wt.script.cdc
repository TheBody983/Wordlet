import WordTokenContract, ForgedTokenContract from 0x1f7da62a915f01c7

pub fun main(address: Address, id: UInt64) : {UInt64 : {String : String}}? {

	let nftOwner = getAccount(address)

	if let ref = nftOwner.getCapability<&{ForgedTokenContract.ForgedTokenCollectionPublic}>(ForgedTokenContract.CollectionPublicPath).borrow() {
		if let forgedToken = ref.borrowForgedToken(id: id) {
			var wordTokenDatas: {UInt64 : {String : String}} = {}
			var i: UInt64 = 0
			while i < UInt64(forgedToken.forged.length) {
				let wordToken: &WordTokenContract.NFT = &forgedToken.forged[i] as &WordTokenContract.NFT
				wordTokenDatas.insert(key: i, {"id": wordToken.id.toString(), "word": wordToken.word, "collection": wordToken.collection})
				i = i + 1
			}
			return wordTokenDatas
		}
	}

	return nil
}