import React, { useState, useEffect } from "react";

import { useAuth } from "../providers/AuthProvider";

import { useUser } from "../providers/UserProvider";

const WordToken = (props) => {
	const { user } = useAuth( )
	const { getForgedTokenData, transferForgedtoken } = useUser( )
	const [tokenData, setTokenData] = useState({})
	const [display, setDisplay] = useState(false)

	
	useEffect(() => {
		getForgedTokenData(setTokenData, user?.addr, props.tokenId)
	}, [ display, user, getForgedTokenData, setTokenData, props ])

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
				<p key="mots">Mots : {tokenData["words"]}</p>
				<p key="tokenId">Token: #{props.tokenId}</p>
				<p key="forgeron">Forgeron : {tokenData["smith"]}</p>
			</div>
			}{props.collection &&
				<>
				<div>
					<label>Receiver address : </label>
					<input type="text" id="ReceiverAddr" placeholder="Entrez un destinataire"/>
					<button onClick={() => transferForgedtoken(document.getElementById("ReceiverAddr").value, props.tokenId)}>Transfer Token</button> 
				</div>
				</>
				}
			<div>
				<button onClick={() => setDisplay(false)}>Clear Token Info</button>
			</div>

		</div>
	);
};

export default WordToken;