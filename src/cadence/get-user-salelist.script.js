export const GET_USER_SALELIST=`
import MarketplaceContract from 0xMarketPlace

pub fun main(address: Address): [UInt64] {
    let account = getAccount(address)

	let saleRef = account.getCapability<&AnyResource{MarketplaceContract.SalePublic}>(/public/NFTSale)
		.borrow()
		?? panic("Impossible d'emprunter la Référence WordletSale")

	return saleRef.getIDs()
}
`