import { query, mutate, tx } from '@onflow/fcl'

import { GET_TOKEN_DATA } from "../cadence/get-token-data.script";
import { TRANSFER_WORD_TOKEN } from '../cadence/transfer-word-token.tx';

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

    const transferWordToken = async ( address, tokenId) => {
        try {
            let transaction = await mutate({
                cadence: TRANSFER_WORD_TOKEN,
                limit: 100,
                args: (arg, t) => [
                    arg(address, t.Address),
                    arg(tokenId, t.UInt64)
                ]
            })
            console.log("TxID : " + transaction)
            await tx(transaction).onceSealed()
            console.log("Transaction Effectuée")
        } catch (error) {
            console.log("Transaction Echouée")
            console.error(error)
        }
    }

    return { getTokenData, transferWordToken }
}