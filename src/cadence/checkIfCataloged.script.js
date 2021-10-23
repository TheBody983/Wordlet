//  userIsInitialized.script.js
//
//  v1
//  Vérifie que le compte utilisateur à bien les Capabilities nécessaire au fonctionnement de Wordlet



import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";



const userIsInitializedScript = `
import MarketplaceContract from 0x1f7da62a915f01c7

pub fun main(userAddress: Address): Bool {

    let wordlet = getAccount(0x1f7da62a915f01c7)
    let wordletCatalogRef = wordlet.getCapability<&{MarketplaceContract.SellerCatalog}>(/public/SellerCatalog)
        .borrow()
        ?? panic("Could not borrow wordlet sales catalog reference")

    return wordletCatalogRef.isInCatalog(sellerAddress: userAddress)
}
`



const userIsinitialized = async (address) => {
    try {
        const encoded = await fcl
            .send([
                fcl.script(userIsInitializedScript),
                fcl.args([
                    fcl.arg(address, t.Address)
                ])
            ])
        const decoded = await fcl.decode(encoded)
        return decoded
    }
    catch(error){
        console.error(error)
    }
}



export default userIsinitialized;