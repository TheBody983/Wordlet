import { mutate, tx, query } from '@onflow/fcl'

import { MINT_FORGEDTOKEN } from "../cadence/mint-forgedtoken.tx";
import { GET_FORGEDTOKEN_DATA } from "../cadence/get-forgedtoken-data.script";
import { TRANSFER_FORGEDTOKEN } from "../cadence/transfer-forgedtoken.tx";

import { useTxs }  from "../providers/TxProvider";

export default function useForgedToken( ) {

    const { addTx } = useTxs() 

    const mintForgedToken = async (wordTokenIds) => {
        try {
            let transaction = await mutate({
                cadence: MINT_FORGEDTOKEN,
                limit: 100,
                args: (arg, t) => [
                    arg(wordTokenIds, t.Array(t.UInt64))
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

    const getForgedTokenData = async (setForgedTokenWords, address, forgedTokenID) => {
        try {
            await query({
                cadence: GET_FORGEDTOKEN_DATA,
                args: (arg, t) => [
                    arg(address, t.Address),
                    arg(forgedTokenID, t.UInt64)
                ]
            })
            .then(function(data) {
                setForgedTokenWords(data)
            })
            
        } catch (error) {
            console.debug("use-forgedtokens: getForgedtokenData Failed")
            console.error(error)
        }
    }

    const transferForgedtoken = async ( address, tokenId) => {
        try {
            let transaction = await mutate({
                cadence: TRANSFER_FORGEDTOKEN,
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
	
    return { mintForgedToken, getForgedTokenData, transferForgedtoken }
}