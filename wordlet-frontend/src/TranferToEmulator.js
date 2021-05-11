import React, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types"

const Transfer = () => {
    const [nftInfo, setNftInfo] = useState(null)
    const fetchTokenData = async () => {
        const encoded = await fcl
            .send([
            fcl.script`
            import PinataPartyContract from 0xf8d6e0586b0a20c7
            pub fun main() : {String : String} {

                // Voir les NFT de 0xf8d6e0586b0a20c7
                let nftOwner = getAccount(0xf8d6e0586b0a20c7)  
                let capability = nftOwner.getCapability<&{PinataPartyContract.NFTReceiver}>(/public/NFTReceiver)
            
                let receiverRef = capability.borrow()
                    ?? panic("Could not borrow the receiver reference")
            
                return receiverRef.getMetadata(id: 1)
            }
            `
            ])
        
        const decoded = await fcl.decode(encoded)
        setNftInfo(decoded)
    };

  const tranferToken = async (tokenId) => {
    const txId = await fcl
    .send([
      fcl.proposer(fcl.authz),
      fcl.payer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(50),
      fcl.args([
        fcl.arg(tokenId, t.UInt64)
      ]),
      fcl.transaction`import PinnieToken from 0xf8d6e0586b0a20c7

      transaction {
        var temporaryVault: @PinnieToken.Vault
      
        prepare(acct: AuthAccount) {
          let vaultRef = acct.borrow<&PinnieToken.Vault>(from: /storage/MainVault)
              ?? panic("Could not borrow a reference to the owner's vault")
            
          self.temporaryVault <- vaultRef.withdraw(amount: 10.0)
        }
      
        execute {
          let recipient = getAccount(0x01cf0e2f2f715450)
      
          let receiverRef = recipient.getCapability(/public/MainReceiver)
                            .borrow<&PinnieToken.Vault{PinnieToken.Receiver}>()
                            ?? panic("Could not borrow a reference to the receiver")
      
          receiverRef.deposit(from: <-self.temporaryVault)
      
          log("Transfer succeeded!")
        }
      }
      `,      
    ])
    const decoded = await fcl.decode(txId);
    console.log(decoded);
    console.log(fcl.tx(txId).onceSealed());
    checkMarketplace();
  };

  return (
    <div className="token-data">
      {
        tokensToSell.map(token => {
          return (
            <div key={token.uri} className="listing">
              <div>
                <h3>{token.name}</h3>
                <h4>Stats</h4>
                <p>Overall Rating: {token.rating}</p>
                <p>Swing Angle: {token.swing_angle}</p>
                <p>Swing Velocity: {token.swing_velocity}</p>
                <p>{parseInt(token.price, 10).toFixed(2)} Pinnies</p>
                <button onClick={() => buyToken(1)} className="btn-primary">Buy Now</button>
                
              </div>
            </div>
          )
        })
      }
    </div>
  );
};

export default Tranfer;