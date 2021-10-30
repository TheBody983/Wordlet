import React, { useState, useEffect } from "react";

import { useAuth } from "../providers/AuthProvider";
import { useUser } from "../providers/UserProvider";

import WordToken from "./WordToken";
import Balance from './Balance';

const GlobalMarketData = () => {
	const { user } = useAuth( )
	const { tokensToSell, checkMarketplace } = useUser( user )

	return (
		
		<section id="marche">
			<h2> Marché </h2>
			<div className="market-listings">
			{tokensToSell?.map(token => {
				return (
					<WordToken market key={token.id} tokenId={token.id} seller={token.seller} price={token.price}/>
				)
			})
			}
			</div>
			<Balance />
			<img src="marche.png" id="marche" alt=""/>
		</section>
	);
};

export default GlobalMarketData