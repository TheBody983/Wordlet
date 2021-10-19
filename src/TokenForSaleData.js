import React, { useState } from "react";

import getTokenMetadata from "./cadence/getTokenMetadata.script";
import removeTokenFromSale from "./cadence/removeTokenFromSale.tx";

const TokenForSaleData = (props) => {
let tokenId = parseInt(props.tokenId)
console.log("id : " + tokenId)
console.log("type : " + typeof(tokenId))

const [nftInfo, setNftInfo] = useState(null)

const fetchTokenData = async (tokenId) => {
	try {
		const data = await getTokenMetadata(tokenId)
		setNftInfo(data)
	} catch (error) {
		console.error(error)
	}
}

return (
	<div>
	<div>
		<button className="btn-primary" onClick={() =>fetchTokenData(props.tokenId)}>Token {props.tokenId}</button>    
	</div>
	{
		nftInfo &&
		<div>
			{
			<div>{
				Object.keys(nftInfo).map(k => {
				return (
					
					<p key={k}>{k}: {nftInfo[k]}</p>
					
				)
				})}
			</div>
			}
			<div>
				<label>Prix : </label>
				<button className="btn-primary" onClick={() => removeTokenFromSale(props.tokenId)}>Retirer de la vente</button> 
			</div>
			<div>
				<div>
				<button onClick={() => setNftInfo(null)} className="btn-secondary">Clear Token Info</button>
				</div>
			</div>          
		</div>
	}
	</div>
);
};

export default TokenForSaleData;