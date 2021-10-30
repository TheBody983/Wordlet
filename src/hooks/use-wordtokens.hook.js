import { query} from '@onflow/fcl'

import { GET_TOKEN_DATA } from "../cadence/get-token-data.script";

// TODO Cleanup
import transferWordToken from "../cadence/transferWordToken.tx";


export default function useWordTokens( ) {

    const getTokenData = async (setTokenData, tokenId) => {
        try {
            await query({
                cadence: GET_TOKEN_DATA,
                args: (arg, t) => [
                    arg(tokenId, t.UInt64)
                ]
            })
            .then(function(data) {
                setTokenData(data)
            })
            
        } catch (error) {
            console.debug("use-wordtokens: getTokenData Failed")
            console.error(error)
        }
    }

    

    return { getTokenData, transferWordToken }
}