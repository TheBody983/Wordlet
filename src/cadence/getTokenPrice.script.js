//  getTokenPrice.script.js
//
//  v1
//  Récupère le prix d'un token placé en paramètre



import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";



const getTokenPriceScript=`
import MarketplaceContract from 0xMarketPlace

pub fun main(id: UInt64): UFix64? {
    // Récupère le compte vendeur
	let seller = getAccount(0x1f7da62a915f01c7)

    // Emprunte la référence de vente du vendeur
	let saleRef = seller.getCapability<&AnyResource{MarketplaceContract.SalePublic}>(/public/NFTSale)
		.borrow()
		?? panic("Impossible d'emprunter la référence de vente du vendeur")

	return saleRef.idPrice(tokenID: id)
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