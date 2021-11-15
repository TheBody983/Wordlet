import React from "react";

import ForgedToken from "./ForgedToken";

import { useUser } from "../providers/UserProvider";

const UserTokens = () => {
	const { getUserForgedTokens, userForgedTokens} = useUser( )
	return (

		<section id="collection">
			<button onClick={() => getUserForgedTokens()}> Actualiser </button>
			{
				userForgedTokens &&
				<>
				{
					Object.keys(userForgedTokens).map(k => {
					return (
						<ForgedToken collection key={userForgedTokens[k]} tokenId={userForgedTokens[k]}/>
					)
					})
				}
				</> 
			}
			<img src="void.png" id="mountains_front" alt=""/>
		</section>
	);
};

export default UserTokens;