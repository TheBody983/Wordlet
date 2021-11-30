import React from "react";

const WordToken = (props) => {

	return (
		<div className="card" key={props.tokenId}>
			<div>
				<h4 key="mot">{props.datas["word"]}</h4>
				<p key="collection">{props.datas["collection"]}</p>
				<p key="tokenId">{"#"+props.datas["id"]}</p>
			</div>
		</div>
	);
};

export default WordToken;