//  Récupère les IDs des tokens à vendre sur le compte placé en paramètre
//  v0
//  
//  Pour la v1
//  Doit récupérer TOUT les tokens en vente
//  ->  Mofifier le script en conséquence



import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"



const checkTokensForSaleScript=`
import MarketplaceContract from 0xMarketPlace

pub fun main(address: Address): [UInt64] {
    let account = getAccount(address)

	let saleRef = account.getCapability<&AnyResource{MarketplaceContract.SalePublic}>(/public/NFTSale)
		.borrow()
		?? panic("Impossible d'emprunter la Référence WordletSale")

	return saleRef.getIDs()
}
`



const checkTokensForSale = async (address) => {
    try {
        const encoded = await fcl
            .send([
                fcl.script(checkTokensForSaleScript),
                fcl.args([
                    fcl.arg(address, t.Address)
                ])
            ])
        return await fcl.decode(encoded)
    } 
    catch (error) {
        console.error(error)
    }
}



export default checkTokensForSale