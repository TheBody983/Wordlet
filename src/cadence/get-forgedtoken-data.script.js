export const GET_FORGEDTOKEN_DATA = `
	import WordTokenContract, ForgedTokenContract from 0x1f7da62a915f01c7

	pub fun main(address: Address, id: UInt64) : ForgedTokenData? {

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
				return ForgedTokenData(words: forgedTokenWords.slice(from: 0, upTo: forgedTokenWords.length-1), smith: forgedToken.smith) 
			}
		}

		return nil
	}

	pub struct ForgedTokenData {
		pub let words: String
		pub let smith: Address

		init(words: String, smith: Address) {
			self.words = words
			self.smith = smith
		}
	}
`