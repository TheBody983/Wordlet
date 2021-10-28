import React, { useState } from "react";

import getTokenMetadata from "../../cadence/getTokenMetadata.script";
import listTokenForSale from "../../cadence/listTokenForSale.tx";
import transferWordToken from "../../cadence/transferWordToken.tx";

const TokenData = (props) => {
let tokenId = parseInt(props.tokenId)

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
		<button  onClick={() =>fetchTokenData(props.tokenId)}>WordToken #{props.tokenId}</button>    
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
				<button onClick={() => transferWordToken(document.getElementById("ReceiverAddr").value, props.tokenId)}>Transfer Token</button> 
			</div>
			<div>
				<label>Prix : </label>
				<input type="text" id="price" placeholder="Entrez un prix"/>
				<button  onClick={() => listTokenForSale(props.tokenId, document.getElementById("price").value)}>Vendre le token</button> 
			</div>
			<div>
				<div>
				<button onClick={() => setNftInfo(null)}>Clear Token Info</button>
				</div>
			</div>          
		</div>
	}
	</>
);
};

export default TokenData;