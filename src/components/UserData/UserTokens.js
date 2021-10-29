import React from "react";

import WordToken from "../WordToken";

import addToSellerCatalog from "../../cadence/addToSellerCatalog.tx"
import removeFromSellerCatalog from "../../cadence/removeFromSellerCatalog.tx"
// import checkIfCataloged from "../../cadence/checkIfCataloged.script"
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
						<WordToken collection key={userWordTokens[k]} tokenId={userWordTokens[k]}/>
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
						<WordToken forSale tokenId={userSalelist[k]}/>
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