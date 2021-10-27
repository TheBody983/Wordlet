import WOTContract from 0x1f7da62a915f01c7
import FungibleToken from 0x9a0766d93b6608b7

transaction {
    let addr: Address

    prepare(acct: AuthAccount) {
        self.addr = acct.address

        let vault <- acct.load<@WOTContract.Vault>(from: WOTContract.VaultStoragePath)
            ?? panic("Impossible d'emprunter la référence")

        destroy vault

        acct.unlink(WOTContract.ReceiverPublicPath)
    }

    post {
        !getAccount(self.addr).getCapability<&WOTContract.Vault{FungibleToken.Receiver}>(WOTContract.ReceiverPublicPath)
            .check():  
            "Référence Reciever du Vault détruite incorrectement"
    }
}