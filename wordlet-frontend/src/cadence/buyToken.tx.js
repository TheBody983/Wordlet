// 	buyToken.tx.js
//	
//  Permet d'acheter un token placé en paramètre
// 	v0 [WIP]
//
//	Pour la v1
//	Doit pouvoir récupérer le prix du listing, pas de magic number
//	-> Modification du script en conséquence



import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";



const buyTokenTx=`
import WordletContract from 0xWordlet
import WOToken from 0xWordlet
import MarketplaceContract from 0xWordlet

transaction (tokenId: UInt64, sellerAddress: Address){

	let collectionRef: &AnyResource{WordletContract.NFTReceiver}
	let temporaryVault: @WOToken.Vault

	prepare(acct: AuthAccount) {
		self.collectionRef = acct.borrow<&AnyResource{WordletContract.NFTReceiver}>(from: /storage/NFTCollection)!

		let vaultRef = acct.borrow<&WOToken.Vault>(from: /storage/MainVault)
			?? panic("Could not borrow owner's vault reference")

		self.temporaryVault <- vaultRef.withdraw(amount: 420.0)
	}

	execute {
		let seller = getAccount(sellerAddress)

		let saleRef = seller.getCapability<&AnyResource{MarketplaceContract.SalePublic}>(/public/NFTSale)
			.borrow()
			?? panic("Could not borrow seller's sale reference")

		saleRef.purchase(tokenID: tokenId, recipient: self.collectionRef, buyTokens: <-self.temporaryVault)
	}
}
`



const buyToken = async (tokenId, address) => {
	const txId = await fcl
	.send([
	fcl.proposer(fcl.authz),
	fcl.payer(fcl.authz),
	fcl.authorizations([fcl.authz]),
	fcl.limit(50),
	fcl.args([
		fcl.arg(tokenId, t.UInt64),
		fcl.arg(address, t.Address)
	]),
	fcl.transaction(buyTokenTx),      
	])
	await fcl.decode(txId);
	console.log(txId)
}



export default buyToken;