export const GET_WORDTOKEN_DATA=`
import WordTokenContract from 0x1f7da62a915f01c7
import NonFungibleToken from 0x631e88ae7f1d7c20

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

pub fun main(addr: Address, id: UInt64) : WordTokenData? {

    let owner = getAccount(addr)
    if let ref = owner.getCapability<&{WordTokenContract.WordTokenCollectionPublic}>(WordTokenContract.CollectionPublicPath).borrow() {
        if let token = ref.borrowWordToken(id: id) {
            return WordTokenData(id: token.id, word: token.word, collection: token.collection)
        }
    }

    return nil
}`