export const GET_WOT_BALANCE = `
import WOTContract from 0x1f7da62a915f01c7
import FungibleToken from 0x9a0766d93b6608b7

pub fun main(addr: Address): UFix64? {
    let acct = getAccount(addr)

    let balanceRef = acct
        .getCapability<&WOTContract.Vault{FungibleToken.Balance}>(WOTContract.ReceiverPublicPath)
        .borrow()

    return balanceRef?.balance
}`