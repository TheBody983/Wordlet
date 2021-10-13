import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"

const linkWOTVault = async () => {
    const txId = await fcl
    .send([
    fcl.proposer(fcl.authz),
    fcl.payer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(50),
    fcl.transaction(linkWOTVaultTx),      
    ])
    await fcl.decode(txId);
    console.log(txId)
}

const linkWOTVaultTx = `
import WOToken from 0x1f7da62a915f01c7

transaction {
  prepare(acct: AuthAccount) {
    acct.link<&WOToken.Vault{WOToken.Receiver, WOToken.Balance}>(/public/MainReceiver, target: /storage/MainVault)

    log("Référence Reciever publique créée")
  }

  post {
    getAccount(0x1f7da62a915f01c7).getCapability<&WOToken.Vault{WOToken.Receiver}>(/public/MainReceiver)
                    .check():
                    "Référence Reciever créée incorrectement"
    }
}

`

export default linkWOTVault