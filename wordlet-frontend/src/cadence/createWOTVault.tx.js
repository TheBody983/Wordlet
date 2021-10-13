import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"

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

const createWOTVaultTx = `
import WOToken from 0x1f7da62a915f01c7

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

export default createWOTVault