//  deleteWordToken.tx.js
//
//  v1
//  Envoie une transation signée de l'utilisateur courant


import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"


const transaction = `
import WordletContract from 0xWordlet

/*
Supprime un wordToken dans la collection du signataire a partir de son identifiant
 */

transaction (wordTokenId: UInt64){

    let collection: @WordletContract.Collection
    let metadata: {String: String}

    prepare(account: AuthAccount) {

        self.collection <- WordletContract.createEmptyCollection()

        let collectionRef = account.borrow<&WordletContract.Collection>(from: /storage/NFTCollection)
            ?? panic("Impossible d'emprunter la référence à la Collection du propriétaire")

        self.metadata = collectionRef.getMetadata(id: wordTokenId)

        self.collection.deposit(token: <- collectionRef.withdraw(withdrawID: wordTokenId), metadata: self.metadata)
    }

    execute {

        destroy self.collection

        log("NFT supprimé")

    }

}
`



const sendTransaction = async (tokenId) => {
    var decoded
    var txId
                                                                                                                                                                                                                                                                                                                    
    // Envoie une transaction placée en paramètre 
    txId = await fcl
    .send([
        fcl.proposer(fcl.authz),
        fcl.payer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(50),
        fcl.transaction(transaction),
        fcl.args([
            fcl.arg(tokenId, t.UInt64)
        ]),
    ])
    decoded = await fcl.decode(txId)

    console.log(decoded)
}



export default sendTransaction;