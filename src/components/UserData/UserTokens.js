import React, { useState, useEffect } from "react";

import TokenData from './TokenData';
import WordToken from "../WordToken";
import TokenForSaleData from "./TokenForSaleData";
import * as fcl from "@onflow/fcl";

import addToSellerCatalog from "../../cadence/addToSellerCatalog.tx"
import removeFromSellerCatalog from "../../cadence/removeFromSellerCatalog.tx"
import checkIfCataloged from "../../cadence/checkIfCataloged.script"
import { useUser } from "../../providers/UserProvider";

const UserTokens = () => {
	const { userWordTokens, userSalelist } = useUser( )

	return (
		<ul>
		{
			userWordTokens &&
			<>
			{
				Object.keys(userWordTokens).map(k => {
				return (
					<li>
						<WordToken collection tokenId={userWordTokens[k]}/>
					</li>
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
					<li>
						<WordToken forSale tokenId={userSalelist[k]}/>
						{/* <TokenForSaleData key={userSalelist[k].tokenId} tokenId={userSalelist[k]}/>   */}
					</li>     
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
		</ul>
	);
};

export default UserTokens;