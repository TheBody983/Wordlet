import { mutate, tx } from '@onflow/fcl'

import { MINT_FORGEDTOKEN } from "../cadence/mint-forgedtoken.tx";

export default function useForgedToken( ) {

    const mintForgedToken = async (wordTokenIds) => {
        try {
            let transaction = await mutate({
                cadence: MINT_FORGEDTOKEN,
                limit: 100,
                args: (arg, t) => [
                    arg(wordTokenIds, [t.UInt64])
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

    return { mintForgedToken }
}