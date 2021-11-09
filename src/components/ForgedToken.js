import React, { useState, useEffect } from "react";

import { useAuth } from "../providers/AuthProvider";

import { useUser } from "../providers/UserProvider";

const WordToken = (props) => {
	const { user } = useAuth( )
	const { getTokenData, transferWordToken, buyWordtoken, listTokenForSale, removeTokenFromSale, getTokenPrice } = useUser( )
	const [tokenData, setTokenData] = useState({})
	const [display, setDisplay] = useState(false)

	
	useEffect(() => {
		getTokenData(setTokenData, props.seller?props.seller:user?.addr, props.tokenId)
	}, [ display ])

	if(!display){
		return (
			<div >
				<button  onClick={() =>setDisplay(true)}>WordToken #{props.tokenId}</button>
			</div>
		)
	}

	return (
		<div className="card" key={props.tokenId}>
			{tokenData &&
			<div>
				<p key="mot">Mot: {tokenData["word"]}</p>
				<p key="tokenId">Token: #{props.tokenId}</p>
				<p key="collection">Collection: {tokenData["collection"]}</p>
			</div>
			}
			<div>
				<button onClick={() => setDisplay(false)}>Clear Token Info</button>
			</div>

		</div>
	);
};

export default WordToken;