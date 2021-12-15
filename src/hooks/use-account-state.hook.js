import { mutate, tx } from '@onflow/fcl'

import { SETUP_ACCOUNT } from "../cadence/setup-account.tx";

import { useTxs }  from "../providers/TxProvider";


export default function useAccountState( ) {

    const { addTx } = useTxs() || {}

    const setupAccount = async () => {
        try {
            let transaction = await mutate({
                cadence: SETUP_ACCOUNT,
                limit: 100
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

    return { setupAccount }
}