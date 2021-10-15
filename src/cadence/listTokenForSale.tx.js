//	listTokenForSale.tx.js
//
//	v1
//	Met un token en vente



import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"



const listTokenForSaleTx=`
import WordletContract from 0xWordlet
import WOToken from 0xWordlet
import MarketplaceContract from 0xWordlet

transaction (tokenId: UInt64, value: UFix64){

	prepare(acct: AuthAccount) {
		let receiver = acct.getCapability<&{WOToken.Receiver}>(/public/MainReceiver)
		let sale <- MarketplaceContract.createSaleCollection(ownerVault: receiver)

		let collectionRef = acct.borrow<&WordletContract.Collection>(from: /storage/NFTCollection)
			?? panic("Could not borrow owner's nft collection reference")

		let token <- collectionRef.withdraw(withdrawID: tokenId)

		sale.listForSale(token: <-token, price: value)

		acct.save(<-sale, to: /storage/NFTSale)

		acct.link<&MarketplaceContract.SaleCollection{MarketplaceContract.SalePublic}>(/public/NFTSale, target: /storage/NFTSale)

		//log("Vente du NFT ".concat(tokenId).concat(" pour ").concat(value).concat("jetons"))
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
            fcl.arg(value, t.UFix64)
        ]),
        fcl.transaction(listTokenForSaleTx)
        ])
	console.log(txId)
}



export default listTokenForSale