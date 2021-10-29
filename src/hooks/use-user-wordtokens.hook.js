import { useEffect, useState } from "react";

import { query } from '@onflow/fcl'
import { GET_USER_WORDTOKENS } from "../cadence/get-user-wordtokens.script";

export default function useUserWordTokens( user ) {
    const [ userWordTokens, setUserWordTokens ] = useState(null)

    useEffect( () => getUserWordTokens(), [ user ] )

    const getUserWordTokens = async () => {
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

    return { userWordTokens, getUserWordTokens }
}