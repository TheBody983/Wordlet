import { useEffect, useState } from "react";

import { query, mutate, tx } from '@onflow/fcl'
import { useAuth } from "../providers/AuthProvider";

export default function useAdvanced() {
    const user = useAuth()

    const [storage, setStorage] = useState([])
    

    const getStorage = async(address)=>{
        try {
            await query({
                cadence: GET_STORAGE_USED,
                args: (arg, t) => [
                    arg(address, t.Address),
                ]
            })
            .then(function(data) {
                setStorage(data)
                console.log(data)
            })
        } catch (error) {
            console.debug("getStorage Failed")
            console.error(error)
        }
    }
    
    const sendCustomTransaction = async (cadenceTx) => {
        try {
            let transaction = await mutate({
                cadence: cadenceTx,
                limit: 500,
            })
            console.log("TxID : " + transaction)
            await tx(transaction).onceSealed()
            console.log("Transaction Effectuée")
        } catch (error) {
            console.log("Transaction Echouée")
            console.error(error)
        }
    }

    const executeCustomScript = async(cadenceScript)=>{
        try {
            await query({
                cadence: cadenceScript,
                args: (arg, t) => []
            })
            .then(function(data) {
                console.log(data)
            })
        } catch (error) {
            console.debug("executeCustomScript Failed")
            console.error(error)
        }
    }

    return {
        sendCustomTransaction,
        executeCustomScript,
    }

}

const GET_STORAGE_USED = `
pub fun main(address: Address) {
    let account = getAccount(address)
    return account.storageUsed
}`

const GET_STORAGE_CAPACITY = `
pub fun main(address: Address) {
    let account = getAccount(address)
    return account.storageCapacity
}`