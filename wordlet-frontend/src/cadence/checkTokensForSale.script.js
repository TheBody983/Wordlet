import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"

// Récupère les IDs des tokens à vendre sur le compte wordlet
// v1

const checkTokensForSale = async () => {
    try {
        const encoded = await fcl
            .send([
                fcl.script(checkTokensForSaleScript)
            ])
        return await fcl.decode(encoded)
    } 
    catch (error) {
        console.error(error)
    }
}

const checkTokensForSaleScript=`

import MarketplaceContract from 0x1f7da62a915f01c7

pub fun main(): [UInt64] {
	let account1 = getAccount(0x1f7da62a915f01c7)

	let acct1saleRef = account1.getCapability<&AnyResource{MarketplaceContract.SalePublic}>(/public/NFTSale)
		.borrow()
		?? panic("Could not borrow acct1 nft sale reference")

	return acct1saleRef.getIDs()
}
`

export default checkTokensForSale