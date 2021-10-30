import React from "react";

import WordToken from "./WordToken";

import addToSellerCatalog from "../cadence/addToSellerCatalog.tx"
import removeFromSellerCatalog from "../cadence/removeFromSellerCatalog.tx"
import { useUser } from "../providers/UserProvider";

const UserTokens = () => {
	const { userWordTokens, userSalelist } = useUser( )

	return (

        <section id="collection">
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
						<WordToken forSale key={userSalelist[k]} tokenId={userSalelist[k]}/>
				)
				})
			}
			</>
		}
		{
		// TODO Affichage conditionnel
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
            <img src="cave.png" id="mountains_front" alt=""/>
        </section>
	);
};

export default UserTokens;