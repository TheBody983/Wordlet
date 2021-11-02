export const GET_MARKET_LISTINGS=`
import MarketplaceContract from 0x1f7da62a915f01c7

pub fun main(): {UInt64: Address}? {

	let marketListings: {UInt64: Address} = {}

	let wordlet = getAccount(0x1f7da62a915f01c7)
    let wordletCatalogRef = wordlet.getCapability<&{MarketplaceContract.SellerCatalog}>(/public/SellerCatalog)
        .borrow()
        ?? panic("Could not borrow wordlet sales catalog reference")

	let sellerCatalog = wordletCatalogRef.getSellerList()

	for seller in sellerCatalog {
		let account = getAccount(seller)

		let sellerRef = account.getCapability<&AnyResource{MarketplaceContract.SalePublic}>(/public/NFTSale)
			.borrow()
			?? panic("Impossible d'emprunter la Référence WordletSale")
	
		let listings = sellerRef.getIDs()
	
		for id in listings {
			marketListings.insert( key: id, seller )
		}
	}

	return marketListings
}`