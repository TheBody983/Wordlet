//  userIsInitialized.script.js
//
//  v1
//  Vérifie que le compte utilisateur à bien les Capabilities nécessaire au fonctionnement de Wordlet



import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";



const userIsInitializedScript = `
import WordletContract from 0xWordlet
import WOToken from 0xWOToken

pub fun main(address: Address) : Bool {
    let acct = getAccount(address)

    let WOToken = acct.getCapability<&WOToken.Vault{WOToken.Balance}>(/public/MainReceiver)
    let Wordlet = acct.getCapability<&{WordletContract.NFTReceiver}>(/public/NFTReceiver)

    WOToken.borrow()
        ?? panic("Impossible d'emprunter la référence WOToken")

    Wordlet.borrow()
        ?? panic("Impossible d'emprunter la référence Wordlet")

    return true
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