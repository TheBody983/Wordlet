import { useEffect, useState, useCallback } from "react";

import { query } from '@onflow/fcl'
import { GET_USER_FORGEDTOKENS } from "../cadence/get-user-forgedtokens.script";

export default function useUserForgedTokens(  user, loggedIn ) { 
	const [ userForgedTokens, setUserForgedTokens ] = useState(null)

	const getUserForgedTokens = useCallback(async () => {
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
	}, [user])

	useEffect( () => {
		if(loggedIn){
			getUserForgedTokens()
		}
	}, [ loggedIn, getUserForgedTokens ] )

	return { userForgedTokens, getUserForgedTokens }
}