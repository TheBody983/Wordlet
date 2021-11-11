import MarketplaceContract002 from 0x1f7da62a915f01c7

pub fun main(sellerAddr: Address, id: UInt64): UFix64? {
    // Récupère le compte vendeur
	let seller = getAccount(sellerAddr)

    // Emprunte la référence de vente du vendeur
	let saleRef = seller.getCapability<&AnyResource{MarketplaceContract002.SalePublic}>(MarketplaceContract002.SaleCollectionPublicPath)
		.borrow()
		?? panic("Impossible d'emprunter la référence de vente du vendeur")

	return saleRef.idPrice(tokenID: id)
}