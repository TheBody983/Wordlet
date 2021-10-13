import React, { useState, useEffect } from "react";
import TokenData from './TokenData';
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import getUserTokens from "./cadence/getUserTokens.script";

const UserData = () => {
	const [userTokens, setUserTokens] = useState(null)

	const fetchUserTokens = async (address) => {
		try{
		
		setUserTokens(await getUserTokens(address))
		} 
		catch (error) {
		setUserTokens(null);

		console.log("UserData : Pas de NFT trouvés")
		}
	};

	const [user, setUser] = useState({loggedIn: null})
	useEffect(() => fcl.currentUser().subscribe(setUser), [])

	if(!userTokens && user.addr){
		fetchUserTokens(user.addr);
	}

	return (
		<div className="token-data">
		<div className="center">
			<button className="btn-primary" onClick={() =>fetchUserTokens(user.addr)}>Actualiser</button>
		</div>
		{
			userTokens &&
			<div class="horizontal-scroll-wrapper squares">
			{
				Object.keys(userTokens).map(k => {
				return (
					<TokenData tokenId={userTokens[k]}/>       
				)
				})
			}
			</div>   
		}
		</div>
	);
};

export default UserData;