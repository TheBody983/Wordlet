//  template.tx.js
//
//  v1
//  Envoie une transation signée de l'utilisateur courant


import * as fcl from "@onflow/fcl";



const transaction = `
import MarketplaceContract from 0x1f7da62a915f01c7

/*
Ajoute le signataire au catalogue des vendeurs
 */

transaction (){

    prepare(account: AuthAccount) {

        let wordlet = getAccount(0x1f7da62a915f01c7)
        let wordletCatalogRef = wordlet.getCapability<&{MarketplaceContract.SellerCatalog}>(/public/SellerCatalog)
            .borrow()
            ?? panic("Could not borrow wordlet sales catalog reference")

        wordletCatalogRef.addSeller(sellerAddr: account.address)

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