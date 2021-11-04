export const LIST_TOKEN_FOR_SALE=`
import WordletContract, WOToken, MarketplaceContract from 0x1f7da62a915f01c7

transaction (tokenId: UInt64, value: UFix64){

    prepare(acct: AuthAccount) {
        let sale = acct.borrow<&MarketplaceContract.SaleCollection>(from: /storage/NFTSale)
            ?? panic("Impossible d'emprunter la ressource de vente")

        let collectionRef = acct.borrow<&WordletContract.Collection>(from: /storage/NFTCollection)
            ?? panic("Impossible d'emprunter la référence à la collection")

        sale.listForSale(token: <- collectionRef.withdraw(withdrawID: tokenId), price: value)
    }
}
`