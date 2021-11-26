import WordTokenContract, ForgedTokenContract from 0x1f7da62a915f01c7

pub struct WordTokenData {
	pub let id: UInt64
	pub let word: String
	pub let collection: String

	init(id: UInt64, word: String, collection: String) {
		self.id = id
		self.word = word
		self.collection = collection
	}
}

pub fun main(address: Address, id: UInt64) : {UInt64 : WordTokenData}? {

	let nftOwner = getAccount(address)

	if let ref = nftOwner.getCapability<&{ForgedTokenContract.ForgedTokenCollectionPublic}>(ForgedTokenContract.CollectionPublicPath).borrow() {
		if let forgedToken = ref.borrowForgedToken(id: id) {
			var wordTokenDatas: {UInt64: WordTokenData} = {}
			var i: UInt64 = 0
			while i < UInt64(forgedToken.forged.length) {
				let wordToken: &WordTokenContract.NFT = &forgedToken.forged[i] as &WordTokenContract.NFT
				wordTokenDatas.insert(key: i, WordTokenData(id: wordToken.id, word: wordToken.word, collection: wordToken.collection))
				i = i + 1
			}
			return wordTokenDatas
		}
	}

	return nil
}