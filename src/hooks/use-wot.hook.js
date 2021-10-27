import { useEffect, useState } from 'react';

import { query } from '@onflow/fcl'

import { GET_WOT_BALANCE } from '../cadence/get-wot-balance.script';

export default function useWOT(user) {
    const [WOTBalance, setWOTBalance] = useState(0)

    useEffect( () => {
        getWOTBalance(user)
    })

    const getWOTBalance = async (user) => {
        try {
            let result = await query({
                cadence: GET_WOT_BALANCE,
                args: (arg, t) => [
                    arg(user?.addr, t.Address)
                ]
            })
            return(result)
            
        } catch (error) {
            console.error(error)
            return(null)
        }
    }

    return [ getWOTBalance, WOTBalance]
    
}