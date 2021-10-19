//	listTokenForSale.tx.js
//
//	v1
//	Met un token en vente



import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"



const listTokenForSaleTx=`
import WordletContract, WOToken, MarketplaceContract from 0x1f7da62a915f01c7


//import WordTokenContract, WOTContract, MarketplaceContract from 0x1f7da62a915f01c7


/*
v1
*/

transaction (tokenId: UInt64, value: UFix64){

    prepare(acct: AuthAccount) {
        let sale = acct.borrow<&MarketplaceContract.SaleCollection>(from: /storage/NFTSale)
            ?? panic("Impossible d'emprunter la ressource de vente")

        let collectionRef = acct.borrow<&WordletContract.Collection>(from: /storage/NFTCollection)
            ?? panic("Impossible d'emprunter la référence à la collection")

        sale.listForSale(token: <- collectionRef.withdraw(withdrawID: tokenId), price: value)
    }
}
`



const listTokenForSale = async (tokenId, value) => {
	const txId = await fcl
        .send([
        fcl.proposer(fcl.authz),
        fcl.payer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(50),
        fcl.args([
            fcl.arg(tokenId, t.UInt64),
            fcl.arg("117.0", t.UFix64)
        ]),
        fcl.transaction(listTokenForSaleTx)
        ])
	console.log(txId)
}



export default listTokenForSale