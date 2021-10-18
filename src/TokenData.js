import React, { useState } from "react";

import getTokenMetadata from "./cadence/getTokenMetadata.script";
import listTokenForSale from "./cadence/listTokenForSale.tx";
import transferWordToken from "./cadence/transferWordToken.tx";
import deleteWordToken from "./cadence/deleteWordToken.tx";

const TokenData = (props) => {
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
	<div className="token-data">
	<div className="center">
		<button className="btn-primary" onClick={() =>fetchTokenData(props.tokenId)}>Token {props.tokenId}</button>    
	</div>
	{
		nftInfo &&
		<div>
			{
			<div>{
				Object.keys(nftInfo).map(k => {
				return (
					
					<p>{k}: {nftInfo[k]}</p>
					
				)
				})}
				<button className="btn-primary" onClick={() =>listTokenForSale(props.tokenId, "100.0")}>Mettre en vente</button>     
			</div>
			}
			<div>
				<label>Receiver address : </label>
				<input type="text" id="ReceiverAddr"/>
				<button className="btn-primary" onClick={() => transferWordToken(document.getElementById("ReceiverAddr").value, props.tokenId)}>Transfer Token</button> 
			</div>
			<div>
				<button className="btn-secondary" onClick={() =>deleteWordToken(props.tokenId)}>Delete WordToken</button> 
			</div>
			<div className="center video">
				<div>
				<button onClick={() => setNftInfo(null)} className="btn-secondary">Clear Token Info</button>
				</div>
			</div>          
		</div>
	}
	</div>
);
};

export default TokenData;