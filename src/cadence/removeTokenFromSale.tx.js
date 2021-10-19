//  template.tx.js
//
//  v1
//  Envoie une transation signée de l'utilisateur courant


import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"



const removeTokenFromSaleTx = `
import WordletContract, WOToken, MarketplaceContract from 0x1f7da62a915f01c7


//import WordTokenContract, WOTContract, MarketplaceContract from 0x1f7da62a915f01c7


/*
v1
*/

transaction (tokenID: UInt64){

    prepare(account: AuthAccount) {
        let saleRef = account.borrow<&MarketplaceContract.SaleCollection>(from: /storage/NFTSale)
            ?? panic("Impossible d'emprunter la référence de vente du AuthAccount")

        let collectionRef = account.borrow<&WordletContract.Collection>(from: /storage/NFTCollection)
            ?? panic("Impossible d'emprunter la référence de la collection")

        let metadata = collectionRef.getMetadata(id: tokenID)
        collectionRef.deposit(token: <- saleRef.withdraw(tokenID: tokenID), metadata: metadata)
    }
}
`



const removeTokenFromSale = async (tokenID) => {
    var decoded
    var txId
    try {                                                                                                                                                                                                                                                                                                                        
        // Envoie une transaction placée en paramètre 
        txId = await fcl
        .send([
            fcl.proposer(fcl.authz),
            fcl.payer(fcl.authz),
            fcl.authorizations([fcl.authz]),
            fcl.args([
                fcl.arg(tokenID, t.UInt64),
            ]),
            fcl.limit(50),
            fcl.transaction(removeTokenFromSaleTx)
        ])
        decoded = await fcl.decode(txId)
    }
    catch(error){
        console.error(error)
    }
    console.log(decoded)
}



export default removeTokenFromSale;