//  template.script.js
//
//  v1
//  Execute un script qui renvoie "ça marche"



import * as fcl from "@onflow/fcl";



const getSellerCatalogScript = `
import MarketplaceContract from 0x1f7da62a915f01c7

pub fun main(): [Address] {

    let wordlet = getAccount(0x1f7da62a915f01c7)
    let wordletCatalogRef = wordlet.getCapability<&{MarketplaceContract.SellerCatalog}>(/public/SellerCatalog)
        .borrow()
        ?? panic("Could not borrow wordlet sales catalog reference")

    return wordletCatalogRef.getSellerList()
}
`



const getSellerCatalog = async () => {
    try {
        const encoded = await fcl
            .send([
                fcl.script(getSellerCatalogScript)
            ])
        const decoded = fcl.decode(encoded)
        return await decoded
    }
    catch(error){
        console.error(error)
    }
}



export default getSellerCatalog;