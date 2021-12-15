import { useEffect, useState, useCallback } from 'react';

import { query, mutate, tx } from '@onflow/fcl'

import { GET_WOT_BALANCE } from '../cadence/get-wot-balance.script';
import { CREATE_WOT_VAULT } from '../cadence/create-wot-vault.tx';

import { useTxs }  from "../providers/TxProvider";

export default function useWOT( user, loggedIn ) {
	const [WOTBalance, setWOTBalance] = useState(null)

	const { addTx } = useTxs() 

	const getWOTBalance = useCallback(async () => {
		if(user){
			try {
				await query({
					cadence: GET_WOT_BALANCE,
					args: (arg, t) => [
						arg(user?.addr, t.Address)
					]
				})
				.then(function(data) {
					setWOTBalance(JSON.parse(data))
				})
				
			} catch (error) {
				console.debug("Impossible de récupérer le solde de WOT de l'utilisateur")
				console.error(error)
			}
		}
	}, [user])

	const createWOTVault = async () => {
		try {
			let transaction = await mutate({
				cadence: CREATE_WOT_VAULT,
				limit: 100
			})
			console.log("Transaction " + transaction + " en cours...")
            addTx(transaction)
            await tx(transaction).onceSealed()
            console.log("Transaction " + transaction + " effectuée")
		} catch (error) {
			console.log("Transaction échouée")
			console.error(error)
		}
	}

	useEffect( () => {
		if(loggedIn){
			getWOTBalance()
		}
	}, [ loggedIn, getWOTBalance ])

	return { WOTBalance, getWOTBalance, createWOTVault }
}