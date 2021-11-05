export const BUY_WORDTOKEN=`
import WordletContract from 0xWordlet
import WOToken from 0xWordlet
import MarketplaceContract from 0xWordlet

transaction (tokenId: UInt64, sellerAddress: Address){

	let collectionRef: &AnyResource{WordletContract.NFTReceiver}
	let temporaryVault: @WOToken.Vault
	let saleRef: &AnyResource{MarketplaceContract.SalePublic}

	prepare(buyer: AuthAccount) {
		// Récupère le compte du propriétaire/vendeur
		let seller = getAccount(sellerAddress)
		
		// Emprunte la référence de vente du propriétaire/vendeur
		self.saleRef = seller.getCapability<&AnyResource{MarketplaceContract.SalePublic}>(/public/NFTSale)
			.borrow()
			?? panic("Impossible d'emprunter la référence de vente du propriétaire")

		// Emprunte la référence au wordlet de l'acheteur
		self.collectionRef = buyer.borrow<&AnyResource{WordletContract.NFTReceiver}>(from: /storage/NFTCollection)!

		// Emprunte la référence au WOTVault de l'acheteur
		let vaultRef = buyer.borrow<&WOToken.Vault>(from: /storage/MainVault)
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