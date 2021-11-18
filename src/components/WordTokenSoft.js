import React, { useState, useEffect } from "react";
import { useAuth } from "../providers/AuthProvider";

import { useUser } from "../providers/UserProvider";

const WordToken = (props) => {
	const { user } = useAuth( )
	const { getTokenData } = useUser( )
	
	const [tokenData, setTokenData] = useState({})
	
	useEffect(() => {
		getTokenData(setTokenData, props.seller?props.seller:user?.addr, props.tokenId)
	})

	return (
		<div className="card" key={props.tokenId}>
			{tokenData &&
			<div>
				<h4 key="mot">{tokenData["word"]}</h4>
				<p key="collection">{tokenData["collection"]}</p>
				<p key="tokenId">#{props.tokenId}</p>
			</div>
			}
		</div>
	);
};

export default WordToken;