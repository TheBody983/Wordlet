//  getUserTokens.script.js
//
//  v1
//  Récupère les tokens d'un utilisateur



import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";



const getUserTokensScript = `
import WordletContract from 0xWordlet

pub fun main(address: Address) : [UInt64] {

// Voir les NFT de address
let nftOwner = getAccount(address)  
let capability = nftOwner.getCapability<&{WordletContract.NFTReceiver}>(/public/NFTReceiver)

let receiverRef = capability.borrow()
    ?? panic("Impossible d'emprunter la Référence Reciever")

return receiverRef.getIDs()
}
`



const getUserTokens = async (address) => {
    try{
        const encoded = await fcl
        .send([
            fcl.script(getUserTokensScript),
            fcl.args([
            fcl.arg(address, t.Address)
            ])
        ])
        var decoded = await fcl.decode(encoded)
        return(decoded)
    } catch (error) {
        console.log("UserData : Pas de NFT trouvés")
        return(null)
    }
};



export default getUserTokens