import React, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"

const MintPinnie = () => {
  const mintPinnies = async (address, qty) => {
    const txId = await fcl
    .send([
      fcl.proposer(fcl.authz),
      fcl.payer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(50),
      fcl.args([
        fcl.arg(address, t.Address),
        fcl.arg(qty, t.UFix64)
      ]),
      fcl.transaction`
      import PinnieToken from 0xf8d6e0586b0a20c7

      transaction (address: Address, qty: UFix64){
          let mintingRef: &PinnieToken.VaultMinter
      
          var receiver: Capability<&PinnieToken.Vault{PinnieToken.Receiver}>
      
          prepare(acct: AuthAccount) {
              self.mintingRef = acct.borrow<&PinnieToken.VaultMinter>(from: /storage/MainMinter)
                  ?? panic("Could not borrow a reference to the minter")
              
              let recipient = getAccount(address)
            
              self.receiver = recipient.getCapability<&PinnieToken.Vault{PinnieToken.Receiver}>
      (/public/MainReceiver)
      
          }
      
          execute {
              self.mintingRef.mintTokens(amount: qty, recipient: self.receiver)
      
              log("Tokens minted and deposited to account")
              log(address)
          }
      }
      
      `,      
    ])
  }

  return (
    <div className="Minter">
      <div className="center">
        <button className="btn-primary" onClick={() => mintPinnies("0xf8d6e0586b0a20c7", "10.0")}>Mint for Emulator</button>
      </div>
    </div>
  );
};

export default MintPinnie;