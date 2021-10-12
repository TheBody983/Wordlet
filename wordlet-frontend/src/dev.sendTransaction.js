import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

const transaction = `
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

const sendTransaction = async (user) => {
    try {                                                                                                                                                                                                                                                                                                                        
        // Envoie une transaction placée en paramètre 
        const txId = await fcl
        .send([
            fcl.proposer(fcl.authz),
            fcl.payer(fcl.authz),
            fcl.authorizations([fcl.authz]),
            fcl.limit(50),
            fcl.transaction(transaction)
        ])
        const decoded = await fcl.decode(txId)
        console.log("Transaction Envoyée : ")
        console.log(decoded)
    }
    catch(error){
        console.error(error)
        console.log("Erreur lors de l'envoi de la transaction")
    }
}

export default sendTransaction;