import { query, mutate, tx } from '@onflow/fcl'

import { GET_TOKEN_DATA } from "../cadence/get-token-data.script";
import { TRANSFER_WORD_TOKEN } from '../cadence/transfer-word-token.tx';

import { useTxs }  from "../providers/TxProvider";

export default function useWordTokens( ) {

    const { addTx } = useTxs() 

    const getTokenData = async (setTokenData, address, wordTokenID) => {
        try {
            await query({
                cadence: GET_TOKEN_DATA,
                args: (arg, t) => [
                    arg(address, t.Address),
                    arg(wordTokenID, t.UInt64)
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
            console.log("Transaction " + transaction + " en cours...")
            addTx(transaction)
            await tx(transaction).onceSealed()
            console.log("Transaction " + transaction + " effectuée")
        } catch (error) {
            console.log("Transaction échouée")
            console.error(error)
        }
    }

    return { getTokenData, transferWordToken }
}