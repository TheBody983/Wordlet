import React, { useState, useEffect } from "react";

import { useAuth } from "../providers/AuthProvider";
import { useUser } from "../providers/UserProvider";

import WordToken from "./WordToken";
import Balance from './Balance';

const GlobalMarketData = () => {
	const { user } = useAuth( )
	const { tokensToSell, checkMarketplace, marketListings, getMarketListings} = useUser( user )

	console.log(marketListings)
	console.log(tokensToSell)

	return (
		
		<section id="marche">
			<h2> Marché </h2>
			<div className="market-listings">
			{marketListings?.map(token => {
				return (
					<WordToken market key={token.id} tokenId={token.id} seller={token.seller}/>
				)
			})
			}
			<button onClick={()=>getMarketListings()}/>
			</div>
			<Balance />
			<img src="marche.png" id="marche" alt=""/>
		</section>
	);
};

export default GlobalMarketData