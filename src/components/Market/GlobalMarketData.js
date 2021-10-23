import React, { useState, useEffect } from "react";

import getSellerCatalog from "../../cadence/getSellerCatalog.script"
import checkTokensForSale from "../../cadence/checkTokensForSale.script";
import getTokenMetadata from "../../cadence/getTokenMetadata.script";
import getTokenPrice from "../../cadence/getTokenPrice.script";
import buyToken from "../../cadence/buyToken.tx";

import * as fcl from "@onflow/fcl";

const GlobalMarketData = () => {
	
	const [tokensToSell, setTokensToSell] = useState([])

	useEffect(() => {
		checkMarketplace();
	}, []);

	const [user, setUser] = useState({loggedIn: null})
	useEffect(() => fcl.currentUser().subscribe(setUser), [])

	
	const checkMarketplace = async () => {

        const sellerList = await getSellerCatalog()

        let marketplaceMetadata = [];

        for(const sellerAddr of sellerList){

			// Récupère les IDs des tokens à vendre sur le compte wordlet
			const tokens = await checkTokensForSale(sellerAddr)

			// Récupère les métadonnées de chaque token
			for (const id of tokens) {
				const decodedMetadata = await getTokenMetadata(id)
				decodedMetadata["price"] = await getTokenPrice(sellerAddr, id)
				decodedMetadata["id"] = id
                decodedMetadata["seller"] = sellerAddr
				marketplaceMetadata.push(decodedMetadata);
			}
        }
        setTokensToSell(marketplaceMetadata);

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
                        <p>Seller: {token.seller}</p>
						<button onClick={() => buyToken(token.id, token.seller)}>Acheter</button>
						
					</div>
				)
			})
		}
		</div>
	);
};

export default GlobalMarketData