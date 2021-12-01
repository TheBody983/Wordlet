import { useEffect, useState } from 'react';

import { query, mutate, tx } from '@onflow/fcl'

import { GET_WOT_BALANCE } from '../cadence/get-wot-balance.script';
import { CREATE_WOT_VAULT } from '../cadence/create-wot-vault.tx';

export default function useWOT( user, loggedIn ) {
    const [WOTBalance, setWOTBalance] = useState(null)

    useEffect( () => {
		getWOTBalance()
	}, [ loggedIn ])

    const getWOTBalance = async () => {
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
    }

    const createWOTVault = async () => {
        try {
            let transaction = await mutate({
                cadence: CREATE_WOT_VAULT,
                limit: 100
            })
            console.log("TxID : " + transaction)
            await tx(transaction).onceSealed()
            console.log("Transaction Effectuée")
        } catch (error) {
            console.log("Transaction Echouée")
            console.error(error)
        }
    }

    return { WOTBalance, getWOTBalance, createWOTVault }
}