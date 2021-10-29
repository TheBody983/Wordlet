import React, { useState, useEffect } from "react";

import getSellerCatalog from "../../cadence/getSellerCatalog.script"
import checkTokensForSale from "../../cadence/checkTokensForSale.script";
import getTokenPrice from "../../cadence/getTokenPrice.script";

import WordToken from "../WordToken";

const GlobalMarketData = () => {
	
	const [tokensToSell, setTokensToSell] = useState([])

	useEffect(() => {
		checkMarketplace();
	}, []);
	
	const checkMarketplace = async () => {

        const sellerList = await getSellerCatalog()

        let marketplaceMetadata = [];

        for(const sellerAddr of sellerList){

			// Récupère les IDs des tokens à vendre sur le compte wordlet
			const tokens = await checkTokensForSale(sellerAddr)

			// Récupère les métadonnées de chaque token
			for (const id of tokens) {
				var decodedMetadata = {}
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
					<WordToken market key={token.id} tokenId={token.id} seller={token.seller} price={token.price}/>
				)
			})
		}
		</div>
	);
};

export default GlobalMarketData