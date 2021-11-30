export const GET_WORDTOKEN_DATA=`
import WordTokenContract, MarketplaceContract002 from 0x1f7da62a915f01c7

pub fun main(address: Address, wordTokenID: UInt64): {String : String}? {

	let owner = getAccount(address)
	if let ref = owner.getCapability<&{WordTokenContract.WordTokenCollectionPublic}>(WordTokenContract.CollectionPublicPath).borrow() {
		if let wordToken: &WordTokenContract.NFT = ref.borrowWordToken(id: wordTokenID) {
			return {"id" : wordToken.id.toString(), "word" : wordToken.word, "collection": wordToken.collection} 
		}
	}

	if let ref = owner.getCapability<&{MarketplaceContract002.SalePublic}>(MarketplaceContract002.SaleCollectionPublicPath).borrow() {
		if let wordToken: &WordTokenContract.NFT = ref.borrowWordToken(id: wordTokenID) {
			return {"id" : wordToken.id.toString(), "word" : wordToken.word, "collection": wordToken.collection}
		}
	}
	
	return nil
}
`