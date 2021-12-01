import { useEffect, useState, useCallback } from "react";

import { query } from '@onflow/fcl'
import { GET_USER_WORDTOKENS } from "../cadence/get-user-wordtokens.script";
import { GET_ALL_WORDTOKEN_DATAS } from "../cadence/get-all-wordtoken-datas.script";

export default function useUserWordTokens( user, loggedIn ) {
	const [ userWordTokens, setUserWordTokens ] = useState(null)
	const [ allWordTokenDatas, setAllWordTokenDatas ] = useState(null)

	const getUserWordTokens = useCallback(async () => {
		if( user ){
			try {
				await query({
					cadence: GET_USER_WORDTOKENS,
					args: (arg, t) => [
						arg(user?.addr, t.Address)
					]
				})
				.then(function(data) {
					setUserWordTokens(data)
				})
				
			} catch (error) {
				console.debug("Impossible de récupérer le collection de l'utilisateur")
				console.error(error)
			}
		}
	}, [user])

	const getAllWordTokenDatas = useCallback(async () => {
		if( user ){
			try {
				await query({
					cadence: GET_ALL_WORDTOKEN_DATAS,
					args: (arg, t) => [
						arg(user?.addr, t.Address),
					]
				})
				.then(function(data) {
					setAllWordTokenDatas(data)
				})
				
			} catch (error) {
				console.debug("Impossible de récupérer le collection de l'utilisateur")
				console.error(error)
			}
		}
	}, [user])

	useEffect( () => {
		if(loggedIn){
			getUserWordTokens()
			getAllWordTokenDatas()
		}
	}, [ loggedIn, getUserWordTokens, getAllWordTokenDatas ])

	return { userWordTokens, getUserWordTokens, allWordTokenDatas, getAllWordTokenDatas}
}