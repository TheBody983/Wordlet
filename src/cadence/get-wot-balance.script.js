export const GET_WOT_BALANCE = `
import WOToken from 0xWordlet

pub fun main(address: Address): UFix64 {
    let account = getAccount(address)

    let accountReceiverRef = account.getCapability<&WOToken.Vault{WOToken.Balance}>(/public/MainReceiver)
        .borrow()
        ?? panic("Impossible d'emprunter la Référence Reciever")

    return accountReceiverRef.balance
}
`