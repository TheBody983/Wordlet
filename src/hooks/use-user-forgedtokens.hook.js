import { useEffect, useState } from "react";

import { query } from '@onflow/fcl'
import { GET_USER_FORGEDTOKENS } from "../cadence/get-user-forgedtokens.script";

export default function useUserForgedTokens( user ) { 
	const [ userForgedTokens, setUserForgedTokens ] = useState(null)

	useEffect( () => getUserForgedTokens(), [ user ] )

	const getUserForgedTokens = async () => {
		if( user ){
			try {
				await query({
					cadence: GET_USER_FORGEDTOKENS,
					args: (arg, t) => [
						arg(user?.addr, t.Address)
					]
				})
				.then(function(data) {
					setUserForgedTokens(data)
				})
				
			} catch (error) {
				console.debug("Impossible de récupérer le collection de l'utilisateur")
				console.error(error)
			}
		}
	}

	return { userForgedTokens, getUserForgedTokens }
}