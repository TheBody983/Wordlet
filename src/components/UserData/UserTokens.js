import React, { useState, useEffect } from "react";
import TokenData from './TokenData';
import TokenForSaleData from "./TokenForSaleData";
import * as fcl from "@onflow/fcl";

import addToSellerCatalog from "../../cadence/addToSellerCatalog.tx"
import removeFromSellerCatalog from "../../cadence/removeFromSellerCatalog.tx"
import checkIfCataloged from "../../cadence/checkIfCataloged.script"
import { useUser } from "../../providers/UserProvider";

const UserTokens = () => {
	const { userWordTokens, userSalelist } = useUser( )

	return (
		<>
		{
			userWordTokens &&
			<>
			{
				Object.keys(userWordTokens).map(k => {
				return (
					<TokenData key={userWordTokens[k].tokenId} tokenId={userWordTokens[k]}/>       
				)
				})
			}
			</> 
		}
		{
			userSalelist &&
			<>
			{
				Object.keys(userSalelist).map(k => {
				return (
					<>
					<TokenForSaleData key={userSalelist[k].tokenId} tokenId={userSalelist[k]}/>  
					</>     
				)
				})
			}
			</>   
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
		</>
	);
};

export default UserTokens;