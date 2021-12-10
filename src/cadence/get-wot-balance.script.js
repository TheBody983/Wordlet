export const GET_WOT_BALANCE = `
import WOTContract from 0xWordlet
import FungibleToken from 0x9a0766d93b6608b7

pub fun main(address: Address): UFix64? {
    let acct = getAccount(address)
	let cap = acct.getCapability<&WOTContract.Vault{FungibleToken.Balance}>(WOTContract.ReceiverPublicPath)
	
	if(cap.check()){
    	let balanceRef = cap.borrow()
        	?? panic("Impossible d'emprunter la Référence Reciever")
		return balanceRef.balance
	}

	return nil
    
}
`