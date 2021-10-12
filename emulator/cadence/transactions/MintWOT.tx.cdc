import WOToken from 0x1f7da62a915f01c7
/*
v1
*/


transaction {
    let mintingRef: &WOToken.VaultMinter

    var receiver: Capability<&WOToken.Vault{WOToken.Receiver}>

	prepare(acct: AuthAccount) {
        self.mintingRef = acct.borrow<&WOToken.VaultMinter>(from: /storage/MainMinter)
            ?? panic("Could not borrow a reference to the minter")
        
        let recipient = getAccount(0x1f7da62a915f01c7)
      
        self.receiver = recipient.getCapability<&WOToken.Vault{WOToken.Receiver}>
(/public/MainReceiver)

	}

    execute {
        self.mintingRef.mintTokens(amount: 30.0, recipient: self.receiver)

        log("30 tokens minted and deposited to account 0x1f7da62a915f01c7")
    }
}
