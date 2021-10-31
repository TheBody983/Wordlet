export const REMOVE_TOKEN_FROM_SALE= `
import WordletContract, WOToken, MarketplaceContract from 0x1f7da62a915f01c7

transaction (tokenID: UInt64){

    prepare(account: AuthAccount) {
        let saleRef = account.borrow<&MarketplaceContract.SaleCollection>(from: /storage/NFTSale)
            ?? panic("Impossible d'emprunter la référence de vente du AuthAccount")

        let collectionRef = account.borrow<&WordletContract.Collection>(from: /storage/NFTCollection)
            ?? panic("Impossible d'emprunter la référence de la collection")

        let metadata = collectionRef.getMetadata(id: tokenID)
        collectionRef.deposit(token: <- saleRef.withdraw(tokenID: tokenID), metadata: metadata)
    }
}
`