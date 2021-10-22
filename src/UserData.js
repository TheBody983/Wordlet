import React, { useState, useEffect } from "react";
import TokenData from './TokenData';
import TokenForSaleData from "./TokenForSaleData";
import * as fcl from "@onflow/fcl";

import getUserTokens from "./cadence/getUserTokens.script";
import checkTokensForSale from "./cadence/checkTokensForSale.script"
import addToSellerCatalog from "./cadence/addToSellerCatalog.tx"

const UserData = () => {
	const [userTokens, setUserTokens] = useState(null)
	const [userTokensSale, setUserTokensSale] = useState(null)

	const fetchUserTokens = async (address) => {
		try{
		setUserTokensSale(await checkTokensForSale(address))
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
			<div className="horizontal-scroll-wrapper squares">
			{
				Object.keys(userTokens).map(k => {
				return (
					<TokenData tokenId={userTokens[k]}/>       
				)
				})
			}
			</div> 
		}
		{
			userTokensSale &&
			<div className="horizontal-scroll-wrapper squares">
			{
				Object.keys(userTokensSale).map(k => {
				return (
					<div>
					<p>for sale</p>
					<TokenForSaleData tokenId={userTokensSale[k]}/>  
					</div>     
				)
				})
			}
			</div>   
		}
		
		{
			<div className="horizontal-scroll-wrapper squares">
			{
				<div>
					<button className="btn-primary" onClick={() =>addToSellerCatalog()}>Ajouter a la liste des vendeurs</button>
				</div>     
			}
			</div>   
		}
		</div>
	);
};

export default UserData;