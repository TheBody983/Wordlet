//  getTokenPrice.script.js
//
//  v1
//  Récupère le prix d'un token placé en paramètre



import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";



const getTokenPriceScript=`
import MarketplaceContract from 0xWordlet

pub fun main(id: UInt64): UFix64? {
	let account1 = getAccount(0x1f7da62a915f01c7)

	let acct1saleRef = account1.getCapability<&AnyResource{MarketplaceContract.SalePublic}>(/public/NFTSale)
		.borrow()
		?? panic("Could not borrow acct nft sale reference")

	return acct1saleRef.idPrice(tokenID: id)
}
`



const getTokenPrice = async (id) => {
    try {
        // Execute un script placé en paramètre 
        const encoded = await fcl
            .send([
                fcl.script(getTokenPriceScript),
                fcl.args([
                    fcl.arg(id, t.UInt64)
                ])
            ])
        return await fcl.decode(encoded)
    }
    catch(error){
        console.error(error)
    }
}



export default getTokenPrice;