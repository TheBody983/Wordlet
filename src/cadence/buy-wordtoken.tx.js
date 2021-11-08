export const BUY_WORDTOKEN=`
import WordTokenContract, WOTContract, MarketplaceContract002 from 0x1f7da62a915f01c7
import FungibleToken from 0x9a0766d93b6608b7

transaction (sellerAddress: Address, tokenId: UInt64){

    let collectionRef: &AnyResource{WordTokenContract.WordTokenCollectionPublic}
    let temporaryVault: @FungibleToken.Vault
    let saleRef: &AnyResource{MarketplaceContract002.SalePublic}

    prepare(buyer: AuthAccount) {
        // Récupère le compte du propriétaire/vendeur
        let seller = getAccount(sellerAddress)
        
        // Emprunte la référence de vente du propriétaire/vendeur
        self.saleRef = seller.getCapability<&AnyResource{MarketplaceContract002.SalePublic}>(MarketplaceContract002.SaleCollectionPublicPath)
            .borrow()
            ?? panic("Impossible d'emprunter la référence de vente du propriétaire")

        // Emprunte la référence au wordlet de l'acheteur
        self.collectionRef = buyer.getCapability<&AnyResource{WordTokenContract.WordTokenCollectionPublic}>(WordTokenContract.CollectionPublicPath)
            .borrow()
            ?? panic("Impossible d'emprunter la référence de collection du propriétaire")

        // Emprunte la référence au WOTVault de l'acheteur
        let vaultRef = buyer.borrow<&FungibleToken.Vault>(from: WOTContract.VaultStoragePath)
            ?? panic("Impossible d'emprunter la référence au WOTVault de l'acheteur")

        // Récupère le prix du token à acheter
        let price = self.saleRef.idPrice(tokenID: tokenId)
            ?? panic("Impossible de trouver le prix du token correspondant")

        self.temporaryVault <- vaultRef.withdraw(amount: price)
    }

    execute {
        self.saleRef.purchase(tokenID: tokenId, recipient: self.collectionRef, buyTokens: <-self.temporaryVault)
    }
}
`