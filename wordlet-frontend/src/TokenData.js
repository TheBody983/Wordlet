import React, { useState } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

const TokenData = (props) => {
  let tokenId = parseInt(props.tokenId)
  console.log("id : " + tokenId)
  console.log("type : " + typeof(tokenId))

  const [nftInfo, setNftInfo] = useState(null)
  const fetchTokenData = async (tokenId) => {
    const encoded = await fcl
      .send([
        fcl.script`
        import PinataPartyContract from 0xf8d6e0586b0a20c7
        pub fun main(tokenId: UInt64) : {String : String} {
          // Voir les NFT de 0xf8d6e0586b0a20c7
          let nftOwner = getAccount(0xf8d6e0586b0a20c7)  
          let capability = nftOwner.getCapability<&{PinataPartyContract.NFTReceiver}>(/public/NFTReceiver)
      
          let receiverRef = capability.borrow()
              ?? panic("Could not borrow the receiver reference")
      
          return receiverRef.getMetadata(id: tokenId)
        }
        `,
        fcl.args([
          fcl.arg(parseInt(tokenId), t.UInt64)
        ])
      ])
    
    const decoded = await fcl.decode(encoded)
    setNftInfo(decoded)
  };
  const listTokenForSale = async (tokenId, value) => {
    const txId = await fcl
    .send([
      fcl.proposer(fcl.authz),
      fcl.payer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(50),
      fcl.args([
        fcl.arg(tokenId, t.UInt64),
        fcl.arg(value, t.UFix64)
      ]),
      fcl.transaction`
          import PinataPartyContract from 0xf8d6e0586b0a20c7
          import PinnieToken from 0xf8d6e0586b0a20c7
          import MarketplaceContract from 0xf8d6e0586b0a20c7

          transaction (tokenId: UInt64, value: UFix64){

              prepare(acct: AuthAccount) {
                  let receiver = acct.getCapability<&{PinnieToken.Receiver}>(/public/MainReceiver)
                  let sale <- MarketplaceContract.createSaleCollection(ownerVault: receiver)

                  let collectionRef = acct.borrow<&PinataPartyContract.Collection>(from: /storage/NFTCollection)
                      ?? panic("Could not borrow owner's nft collection reference")

                  let token <- collectionRef.withdraw(withdrawID: tokenId)

                  sale.listForSale(token: <-token, price: value)

                  acct.save(<-sale, to: /storage/NFTSale)

                  acct.link<&MarketplaceContract.SaleCollection{MarketplaceContract.SalePublic}>(/public/NFTSale, target: /storage/NFTSale)

                  //log("Vente du NFT ".concat(tokenId).concat(" pour ").concat(value).concat("jetons"))
              }
          }
          `,      
      ])
      }

  return (
    <div className="token-data">
      <div className="center">
        <button className="btn-primary" onClick={() =>fetchTokenData(props.tokenId)}>Token {props.tokenId}</button>        
      </div>
      {
        nftInfo &&
        <div>
          {
            <div>{
            Object.keys(nftInfo).map(k => {
              return (
                
                  <p>{k}: {nftInfo[k]}</p>
                
              )
            })}
            <button className="btn-primary" onClick={() =>listTokenForSale(props.tokenId, "10.0")}>Mettre en vente</button>        
          </div>
          }
          <div className="center video">
            <div>
              <button onClick={() => setNftInfo(null)} className="btn-secondary">Clear Token Info</button>
            </div>
          </div>          
        </div>
      }
    </div>
  );
};

export default TokenData;