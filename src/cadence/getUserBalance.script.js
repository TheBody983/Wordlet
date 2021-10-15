//  getUserBalance.script.js
//
//  v1
//  Récupère le nombre de WOT d'un compte



import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";



const getUserBalanceScript = `
import WOToken from 0xWordlet

pub fun main(address: Address): UFix64 {
    let account = getAccount(address)

    let accountReceiverRef = account.getCapability<&WOToken.Vault{WOToken.Balance}>(/public/MainReceiver)
        .borrow()
        ?? panic("Impossible d'emprunter la Référence Reciever")

    return accountReceiverRef.balance
}
`



const getUserBalance = async (address) => {
    try {
        // Execute un script placé en paramètre 
        const encoded = await fcl
            .send([
                fcl.script(getUserBalanceScript),
                fcl.args([
                    fcl.arg(address, t.Address)
                ])
            ])

            return await fcl.decode(encoded)
        
    }
    catch(error){
        if(!error instanceof TypeError) console.error(error)
        return 0
    }
}



export default getUserBalance;