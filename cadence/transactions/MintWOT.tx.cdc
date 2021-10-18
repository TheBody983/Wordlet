import WOToken from 0x1f7da62a915f01c7
/*
v1

Créé n WOT pour le compte Wordlet
*/


transaction (receiverAddr: Address, amount: UFix64){

    let mintingRef: &WOToken.VaultMinter

    var receiver: Capability<&WOToken.Vault{WOToken.Receiver}>

	prepare(acct: AuthAccount) {
        self.mintingRef = acct.borrow<&WOToken.VaultMinter>(from: /storage/MainMinter)
            ?? panic("Could not borrow a reference to the minter")
        
        let recipient = getAccount(receiverAddr)
      
        self.receiver = recipient.getCapability<&WOToken.Vault{WOToken.Receiver}>(/public/MainReceiver)

	}

    execute {
        self.mintingRef.mintTokens(amount: amount, recipient: self.receiver)

        log(amount.toString().concat(" WOT minted and deposited to account ".concat(receiverAddr.toString())))
    }
}
