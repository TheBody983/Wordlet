import React, { useState, useEffect } from "react";

import { useAuth } from "../providers/AuthProvider";

import { useUser } from "../providers/UserProvider";

const WordToken = (props) => {
	const { user } = useAuth( )
	const { getForgedTokenWords } = useUser( )
	const [tokenData, setTokenData] = useState({})
	const [display, setDisplay] = useState(false)

	
	useEffect(() => {
		getForgedTokenWords(setTokenData, props.seller?props.seller:user?.addr, props.tokenId)
	}, [ display ])

	if(!display){
		return (
			<div >
				<button  onClick={() =>setDisplay(true)}>ForgedToken #{props.tokenId}</button>
			</div>
		)
	}

	return (
		<div className="card" key={props.tokenId}>
			{tokenData &&
			<div>
				<p key="mots">Mots: {tokenData}</p>
			</div>
			}
			<div>
				<button onClick={() => setDisplay(false)}>Clear Token Info</button>
			</div>

		</div>
	);
};

export default WordToken;