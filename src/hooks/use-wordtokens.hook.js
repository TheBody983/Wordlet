import { useEffect, useState } from "react";

import { query} from '@onflow/fcl'
import { GET_TOKEN_DATA } from "../cadence/get-token-data.script";

export default function getTokenData( id ) {
    const [ tokenData, setTokenData ] = useState(null)

    useEffect( () => getTokenData(), [ id ] )

    const getTokenData = async () => {
        try {
            await query({
                cadence: GET_TOKEN_DATA,
                args: (arg, t) => [
                    arg(user?.addr, t.Address)
                ]
            })
            .then(function(data) {
                setUserWordTokens(data)
            })
            
        } catch (error) {
            console.error(error)
        }
    }

    return { tokenData, getTokenData }
}