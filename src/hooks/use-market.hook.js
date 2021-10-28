import { useEffect, useState } from "react";

import { query, mutate, tx } from '@onflow/fcl'
import { GET_USER_SALELIST } from "../cadence/get-user-salelist";

export default function useMarket( user ) {
    const [ userSalelist, setUserSalelist ] = useState(null)

    useEffect( () => getUserSalelist(), [ user ] )

    const getUserSalelist = async () => {
        try {
            await query({
                cadence: GET_USER_SALELIST,
                args: (arg, t) => [
                    arg(user?.addr, t.Address)
                ]
            })
            .then(function(data) {
                setUserSalelist(data)
            })
            
        } catch (error) {
            console.error(error)
        }
    }

    return { userSalelist, getUserSalelist }
}