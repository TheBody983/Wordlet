import React, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"

const MarketData = () => {
const [tokensToSell, setTokensToSell] = useState([])
useEffect(() => {
	checkMarketplace();
}, []);

const checkMarketplace = async () => {
	try {
		// Récupère les IDs des tokens à vendre sur le compte émulateur
		const encoded = await fcl.send([
			fcl.script`
			import MarketplaceContract from 0x1f7da62a915f01c7

			pub fun main(): [UInt64] {
				let account1 = getAccount(0x1f7da62a915f01c7)
			
				let acct1saleRef = account1.getCapability<&AnyResource{MarketplaceContract.SalePublic}>(/public/NFTSale)
					.borrow()
					?? panic("Could not borrow acct1 nft sale reference")
			
				return acct1saleRef.getIDs()
			}
			`,
		]);
		const decoded = await fcl.decode(encoded);
		console.log("Tokens trouvés")
		console.log(decoded)

		let marketplaceMetadata = [];
		// Récupère les métadonnées de chanque token
		for (const id of decoded) {
			const encodedMetadata = await fcl.send([
				fcl.script`
					import WordletContract from 0x1f7da62a915f01c7
					pub fun main(id: UInt64) : {String : String} {
					let nftOwner = getAccount(0x1f7da62a915f01c7)  
					let capability = nftOwner.getCapability<&{WordletContract.NFTReceiver}>(/public/NFTReceiver)
				
					let receiverRef = capability.borrow()
						?? panic("Could not borrow the receiver reference")
				
					return receiverRef.getMetadata(id: id)
					}
				`,
				fcl.args([
					fcl.arg(id, t.UInt64)    
				]),
			]);
			const decodedMetadata = await fcl.decode(encodedMetadata);
			console.log("token extrait")
			console.log(id)
			console.log(decodedMetadata)


			const encodedPrice = await fcl.send([
			fcl.script`
				import MarketplaceContract from 0x1f7da62a915f01c7

				pub fun main(id: UInt64): UFix64? {
					let account1 = getAccount(0x1f7da62a915f01c7)
				
					let acct1saleRef = account1.getCapability<&AnyResource{MarketplaceContract.SalePublic}>(/public/NFTSale)
						.borrow()
						?? panic("Could not borrow acct nft sale reference")
				
					return acct1saleRef.idPrice(tokenID: id)
				}
			`, 
			fcl.args([
				fcl.arg(id, t.UInt64)
			])
			])
			const decodedPrice = await fcl.decode(encodedPrice)
			console.log("prix extrait")
			console.log(decodedPrice)
			decodedMetadata["price"] = decodedPrice;
			marketplaceMetadata.push(decodedMetadata);
		}
		setTokensToSell(marketplaceMetadata);
	} catch (error) {
		console.error(error)
		console.log("MarketData : NO NFTs FOR SALE");
	}
};

const buyToken = async (tokenId) => {
	const txId = await fcl
	.send([
	fcl.proposer(fcl.authz),
	fcl.payer(fcl.authz),
	fcl.authorizations([fcl.authz]),
	fcl.limit(50),
	fcl.args([
		fcl.arg(tokenId, t.UInt64)
	]),
	fcl.transaction`
		import WordletContract from 0x1f7da62a915f01c7
		import WOToken from 0x1f7da62a915f01c7
		import MarketplaceContract from 0x1f7da62a915f01c7
		
		transaction (tokenId: UInt64){
			let collectionRef: &AnyResource{WordletContract.NFTReceiver}
			let temporaryVault: @WOToken.Vault
			prepare(acct: AuthAccount) {
				self.collectionRef = acct.borrow<&AnyResource{WordletContract.NFTReceiver}>(from: /storage/NFTCollection)!
				let vaultRef = acct.borrow<&WOToken.Vault>(from: /storage/MainVault)
					?? panic("Could not borrow owner's vault reference")
				self.temporaryVault <- vaultRef.withdraw(amount: 10.0)
			}
			execute {
				let seller = getAccount(0x1f7da62a915f01c7)
				let saleRef = seller.getCapability<&AnyResource{MarketplaceContract.SalePublic}>(/public/NFTSale)
					.borrow()
					?? panic("Could not borrow seller's sale reference")
				saleRef.purchase(tokenID: tokenId, recipient: self.collectionRef, buyTokens: <-self.temporaryVault)
			}
		}
	`,      
	])
	await fcl.decode(txId);
	checkMarketplace();
}

return (
	<div className="token-data">
	{
		tokensToSell.map(token => {
		return (
			<div key={token.uri} className="listing">
			<div>
				<h3>{token.name}</h3>
				<h4>Stats</h4>
				<p>Mot : {token.mot}</p>
				<p>Source : {token.source}</p>
				<p>Type : {token.type}</p>
				
				<h4>Price</h4>
				<p>{parseInt(token.price, 10).toFixed(2)} WOT</p>
				<button onClick={() => buyToken(1)} className="btn-primary">Buy Now</button>
				
			</div>
			</div>
		)
		})
	}
	</div>
);
};

export default MarketData;