import React, { useState } from "react";

import getTokenMetadata from "../../cadence/getTokenMetadata.script";
import listTokenForSale from "../../cadence/listTokenForSale.tx";
import transferWordToken from "../../cadence/transferWordToken.tx";
import deleteWordToken from "../../cadence/deleteWordToken.tx";

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
	<>
	<div >
		<button className="btn-primary" onClick={() =>fetchTokenData(props.tokenId)}>Token {props.tokenId}</button>    
	</div>
	{
		nftInfo &&
		<div className="card">
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
				<label>Receiver address : </label>
				<input type="text" id="ReceiverAddr" placeholder="Entrez un destinataire"/>
				<button className="btn-primary" onClick={() => transferWordToken(document.getElementById("ReceiverAddr").value, props.tokenId)}>Transfer Token</button> 
			</div>
			<div>
				<label>Prix : </label>
				<input type="text" id="price" placeholder="Entrez un prix"/>
				<button className="btn-primary" onClick={() => listTokenForSale(props.tokenId, document.getElementById("price").value)}>Vendre le token</button> 
			</div>
			<div>
				<button className="btn-secondary" onClick={console.log("no")/*() =>deleteWordToken(props.tokenId)*/}>Delete WordToken (no) </button> 
			</div>
			<div>
				<div>
				<button onClick={() => setNftInfo(null)} className="btn-secondary">Clear Token Info</button>
				</div>
			</div>          
		</div>
	}
	</>
);
};

export default TokenData;