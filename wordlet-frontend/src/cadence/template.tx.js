//  template.tx.js
//
//  v1
//  Envoie une transation signée de l'utilisateur courant


import * as fcl from "@onflow/fcl";



const transaction = `
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