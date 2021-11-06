import WordTokenContract, MarketplaceContract002 from 0x1f7da62a915f01c7

pub fun main(address: Address, wordTokenID: UInt64): WordTokenData? {

    let owner = getAccount(address)
    if let ref = owner.getCapability<&{WordTokenContract.WordTokenCollectionPublic}>(WordTokenContract.CollectionPublicPath).borrow() {
        if let token = ref.borrowWordToken(id: wordTokenID) {
            return WordTokenData(id: token.id, word: token.word, collection: token.collection)
        }
    }

    if let ref = owner.getCapability<&{MarketplaceContract002.SalePublic}>(MarketplaceContract002.SaleCollectionPublicPath).borrow() {
        if let token = ref.borrowWordToken(id: wordTokenID) {
            return WordTokenData(id: token.id, word: token.word, collection: token.collection)
        }
    }
    
    return nil
}

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