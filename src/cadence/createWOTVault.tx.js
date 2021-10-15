//  createWOTokenVault.tx.js
//  
//  v1 
//  Créé un Vault de WOT sur le compte courant ainsi qu'une référence à lui



import * as fcl from "@onflow/fcl";



const createWOTVaultTx = `
import WOToken from 0xWordlet

/*
v1
 */
transaction{
    let address: Address

    prepare(acct: AuthAccount) {
        self.address = acct.address

        let vaultA <- WOToken.createEmptyVault()
          
        acct.save<@WOToken.Vault>(<-vaultA, to: /storage/MainVault)

        log("Vault vide Stocké")

        let ReceiverRef = acct.link<&WOToken.Vault{WOToken.Receiver, WOToken.Balance}>(/public/MainReceiver, target: /storage/MainVault)

        log("Références créées")
    }

    post {
        getAccount(self.address).getCapability<&WOToken.Vault{WOToken.Receiver}>(/public/MainReceiver)
            .check():  
            "Référence Reciever du Vault créée incorrectement"
    }
}
`



const createWOTVault = async () => {
    const txId = await fcl
    .send([
    fcl.proposer(fcl.authz),
    fcl.payer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(50),
    fcl.transaction(createWOTVaultTx),      
    ])
    await fcl.decode(txId);
    console.log(txId)
}



export default createWOTVault