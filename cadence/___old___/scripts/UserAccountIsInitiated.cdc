import WordletContract from 0x1f7da62a915f01c7
import WOToken from 0x1f7da62a915f01c7

pub fun main(address: Address) : Bool {
    let acct = getAccount(address)

    let WOToken = acct.getCapability<&WOToken.Vault{WOToken.Balance}>(/public/MainReceiver)
    let Wordlet = acct.getCapability<&{WordletContract.NFTReceiver}>(/public/NFTReceiver)

    WOToken.borrow()
        ?? panic("Impossible d'emprunter la référence WOToken")

    Wordlet.borrow()
        ?? panic("Impossible d'emprunter la référence Wordlet")

    return true
}