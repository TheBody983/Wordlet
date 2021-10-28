import React, { useState } from "react";

import listTokenForSale from "../cadence/listTokenForSale.tx";
import transferWordToken from "../cadence/transferWordToken.tx";
import buyToken from "../cadence/buyToken.tx";
import removeTokenFromSale from "../cadence/removeTokenFromSale.tx";

const WordToken = (props) => {
	return (
		<>
			<div className="card" key={props.tokenId}>
				<div>
					<p key="mot">Mot: {props.mot}</p>
					<p key="type">Type: {props.type}</p>
					<p key="source">Source: {props.source}</p>
				</div>
				{props.collection &&
				<>
				<div>
					<label>Receiver address : </label>
					<input type="text" id="ReceiverAddr" placeholder="Entrez un destinataire"/>
					<button onClick={() => transferWordToken(document.getElementById("ReceiverAddr").value, props.tokenId)}>Transfer Token</button> 
				</div>
				<div>
					<label>Prix : </label>
					<input type="text" id="price" placeholder="Entrez un prix"/>
					<button  onClick={() => listTokenForSale(props.tokenId, document.getElementById("price").value)}>Vendre le token</button> 
				</div>
				</>
				} {props.market &&
				<>
				<div>
					<h4>Price</h4>
					<p>{props.price} WOT</p>
				</div>
				<div>
					<p>Seller: {props.seller}</p>
					<button onClick={() => buyToken(props.id, props.seller)}>Acheter</button>
				</div>
				</>
				} {props.forsale &&
				<>
				<div>
					<label>Prix : </label>
					<button className="btn-primary" onClick={() => removeTokenFromSale(props.tokenId)}>Retirer de la vente</button> 
				</div>
				</>

			}
			</div>
		</>
	);
};

export default WordToken;