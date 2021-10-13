import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

const transaction = `
import WOToken from 0x1f7da62a915f01c7

transaction {
    prepare(acct: AuthAccount) {
        log("Bonjour")
    }
}
`

const sendTransaction = async () => {
    var decoded
    var txId
    try {                                                                                                                                                                                                                                                                                                                        
        // Envoie une transaction placée en paramètre 
        txId = await fcl
        .send([
            fcl.proposer(fcl.authz),
            fcl.payer(fcl.authz),
            fcl.authorizations([fcl.authz]),
            fcl.limit(50),
            fcl.transaction(transaction)
        ])
        decoded = await fcl.decode(txId)
    }
    catch(error){
        console.error(error)
    }
    console.log(decoded)
}

export default sendTransaction;