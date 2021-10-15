import React, { useState, useEffect } from "react";

import checkTokensForSale from "./cadence/checkTokensForSale.script";
import getTokenMetadata from "./cadence/getTokenMetadata.script";
import getTokenPrice from "./cadence/getTokenPrice.script";
import buyToken from "./cadence/buyToken.tx";

import * as fcl from "@onflow/fcl";

const MarketData = () => {
const [tokensToSell, setTokensToSell] = useState([])

useEffect(() => {
	checkMarketplace(user.addr);
}, []);

const [user, setUser] = useState({loggedIn: null})
useEffect(() => fcl.currentUser().subscribe(setUser), [])

const checkMarketplace = async () => {
	try {
		// Récupère les IDs des tokens à vendre sur le compte wordlet
		const tokens = await checkTokensForSale(user.addr)

		let marketplaceMetadata = [];
		// Récupère les métadonnées de chaque token
		for (const id of tokens) {
			const decodedMetadata = await getTokenMetadata(id)
			decodedMetadata["price"] = await getTokenPrice(id)
			decodedMetadata["id"] = id
			marketplaceMetadata.push(decodedMetadata);
		}
		setTokensToSell(marketplaceMetadata);
	} catch (error) {
		console.error(error)
	}
};

return (
	<div className="market-listings">
	{
		tokensToSell.map(token => {
		return (
			<div key={token.id} className="listing">
			
				<h3>{token.mot}</h3>
				<p>{token.id}</p>
				<p>Source: {token.source}</p>
				<p>Type: {token.type}</p>
				
				<h4>Price</h4>
				<p>{parseInt(token.price, 10).toFixed(2)} WOT</p>
				<button onClick={() => buyToken(token.id, user.addr)}>Acheter</button>
				
			</div>
		)
		})
	}
	</div>
);
};

export default MarketData;