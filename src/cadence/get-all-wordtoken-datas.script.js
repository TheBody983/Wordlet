export const GET_ALL_WORDTOKEN_DATAS = `
import WordTokenContract from 0x1f7da62a915f01c7

pub fun main(address: Address) : [{String : String}]? {
    let owner = getAccount(address)

    if let ref = owner.getCapability<&{WordTokenContract.WordTokenCollectionPublic}>(WordTokenContract.CollectionPublicPath).borrow() {
		let ids: [UInt64] = ref.getIDs()
		var wordTokenDatas: [{String : String}] =  []
		var i: UInt64 = 0
		while i < UInt64(ids.length) {
			let wordToken: &WordTokenContract.NFT = ref.borrowWordToken(id: ids[i])!
			wordTokenDatas.insert(at: i, {"id" : wordToken.id.toString(), "word" : wordToken.word, "collection": wordToken.collection})
			i = i + 1
		}
		return wordTokenDatas
    }
	return nil
}
`