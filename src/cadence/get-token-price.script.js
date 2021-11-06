export const GET_TOKEN_PRICE=`
import MarketplaceContract002 from 0xWordlet

pub fun main(sellerAddr: Address, tokenId: UInt64): UFix64? {
    // Récupère le compte vendeur
	let seller = getAccount(sellerAddr)

    // Emprunte la référence de vente du vendeur
	let saleRef = seller.getCapability<&AnyResource{MarketplaceContract002.SalePublic}>(MarketplaceContract002.SaleCollectionPublicPath)
		.borrow()
		?? panic("Impossible d'emprunter la référence de vente du vendeur : ".concat(sellerAddr.toString()).concat(", token ciblé : ".concat(tokenId.toString())))

	return saleRef.idPrice(tokenID: tokenId)
}
`