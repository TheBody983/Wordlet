import { mutate, tx } from '@onflow/fcl'

import { SETUP_ACCOUNT } from "../cadence/setup-account.tx";

export default function useAccountState( ) {

    const setupAccount = async () => {
        try {
            let transaction = await mutate({
                cadence: SETUP_ACCOUNT,
                limit: 100
            })
            console.log("TxID : " + transaction)
            await tx(transaction).onceSealed()
            console.log("Transaction Effectuée")
        } catch (error) {
            console.log("Transaction Echouée")
            console.error(error)
        }
    }

    return { setupAccount }
}