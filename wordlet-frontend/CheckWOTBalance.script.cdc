import WOToken from 0x1f7da62a915f01c7

pub fun main(addr: Address): UFix64 {
    let acct = getAccount(addr)

    let acctReceiverRef = acct.getCapability<&WOToken.Vault{WOToken.Balance}>(/public/MainReceiver)
        .borrow()
        ?? panic("Impossible d'emprunter la Référence Reciever")

    log("Balance du Compte :")
    log(acctReceiverRef.balance)
    return acctReceiverRef.balance
}