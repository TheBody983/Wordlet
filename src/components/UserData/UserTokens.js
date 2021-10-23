import React, { useState, useEffect } from "react";
import TokenData from './TokenData';
import TokenForSaleData from "./TokenForSaleData";
import * as fcl from "@onflow/fcl";

import getUserTokens from "./cadence/getUserTokens.script";
import checkTokensForSale from "./cadence/checkTokensForSale.script"
import addToSellerCatalog from "./cadence/addToSellerCatalog.tx"
import removeFromSellerCatalog from "./cadence/removeFromSellerCatalog.tx"
import checkIfCataloged from "./cadence/checkIfCataloged.script"
 
const UserTokens = () => {
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
		<>
		<div>
			<button className="btn-primary" onClick={() =>fetchUserTokens(user.addr)}>Actualiser</button>
		</div>
		{
			userTokens &&
			<div>
			{
				Object.keys(userTokens).map(k => {
				return (
					<TokenData key={userTokens[k].tokenId} tokenId={userTokens[k]}/>       
				)
				})
			}
			</div> 
		}
		{
			userTokensSale &&
			<div>
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
						<button className="btn-primary" onClick={() =>addToSellerCatalog()}>S'ajouter a la liste des vendeurs</button>
					</div>     
				}

				{
					<div>
						<button className="btn-primary" onClick={() =>removeFromSellerCatalog()}>Se retirer de la liste des vendeurs</button>
					</div>     
				}
			</div>   
		}
		</div>
	);
};

export default UserTokens;