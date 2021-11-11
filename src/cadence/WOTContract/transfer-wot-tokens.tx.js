export const TRANSFER_WOT_TOKENS=`
import WOTContract from 0x1f7da62a915f01c7
import FungibleToken from 0x9a0766d93b6608b7

transaction {
    var temporaryVault: @FungibleToken.Vault

    prepare(acct: AuthAccount) {
        let vaultRef = acct
            .borrow<&FungibleToken.Vault>(from: WOTContract.VaultStoragePath)
            ?? panic("Impossible d'emprunter la référence au Vault du propriétaire")
        
        self.temporaryVault <- vaultRef.withdraw(amount: 10.0)
    }

    execute {
        let recipient = getAccount(0x1f7da62a915f01c7)

        let receiverRef = recipient
            .getCapability(WOTContract.ReceiverPublicPath)!
            .borrow<&{FungibleToken.Receiver}>()
                ?? panic("Impossible d'emprunter la référence Receiver")

        receiverRef.deposit(from: <-self.temporaryVault)
    }
}`