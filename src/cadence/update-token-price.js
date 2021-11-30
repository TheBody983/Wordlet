export const UPDATE_TOKEN_PRICE = `
import WordTokenContract, WOTContract, MarketplaceContract002 from 0x1f7da62a915f01c7

transaction (tokenId: UInt64, value: UFix64){

    prepare(acct: AuthAccount) {
        let sale = acct.borrow<&MarketplaceContract002.SaleCollection>(from: MarketplaceContract002.SaleCollectionStoragePath)
            ?? panic("Impossible d'emprunter la ressource de vente")

        sale.changePrice(tokenID: tokenId, newPrice: value)
    }
}
`