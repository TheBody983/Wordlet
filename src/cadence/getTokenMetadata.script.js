//  getTokenMetadata.script.js  
//
//  v1
//  Récupère les métadonnées d'un token



import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"

const getTokenMetadataScript=`
import WordletContract from 0xWordlet

pub fun main(id: UInt64) : {String : String} {
    let nftOwner = getAccount(0x1f7da62a915f01c7)  
    let capability = nftOwner.getCapability<&{WordletContract.NFTReceiver}>(/public/NFTReceiver)

    let receiverRef = capability.borrow()
        ?? panic("Could not borrow the receiver reference")

    return receiverRef.getMetadata(id: id)
}
`

const getTokenMetadata = async (id) => {
    try {
        const encoded = await fcl
            .send([
                fcl.script(getTokenMetadataScript),
                fcl.args([
                    fcl.arg(id, t.UInt64)
                ])
            ])
        const decoded = await fcl.decode(encoded)
        return decoded
    }
    catch(error){
        console.error(error)
    }
}

export default getTokenMetadata;