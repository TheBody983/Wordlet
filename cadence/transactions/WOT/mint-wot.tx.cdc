import WOTContract from 0x1f7da62a915f01c7
import FungibleToken from 0x9a0766d93b6608b7

transaction(amount: UFix64) {

    let tokenMinter: &WOTContract.MinterProxy
    let tokenReceiver: &{FungibleToken.Receiver}

    prepare(acct: AuthAccount) {
        self.tokenMinter = acct
            .borrow<&WOTContract.MinterProxy>(from: WOTContract.MinterProxyStoragePath)
            ?? panic("Pas de Minter Disponible")

        self.tokenReceiver = acct
            .getCapability(WOTContract.ReceiverPublicPath)!
            .borrow<&{FungibleToken.Receiver}>()
                ?? panic("Impossible d'emprunter la Référence Receiver")
    }

    execute {
        self.tokenReceiver.deposit(from: <- self.tokenMinter.mintTokens(amount: amount))
    }
}