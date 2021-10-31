export const GET_TOKEN_PRICE=`
import MarketplaceContract from 0xMarketPlace

pub fun main(sellerAddr: Address, id: UInt64): UFix64? {
    // Récupère le compte vendeur
	let seller = getAccount(sellerAddr)

    // Emprunte la référence de vente du vendeur
	let saleRef = seller.getCapability<&AnyResource{MarketplaceContract.SalePublic}>(/public/NFTSale)
		.borrow()
		?? panic("Impossible d'emprunter la référence de vente du vendeur")

	return saleRef.idPrice(tokenID: id)
}
`