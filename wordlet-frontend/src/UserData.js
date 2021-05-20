import React, { useState } from "react";
import TokenData2 from './TokenData2';
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

const UserData = () => {
  const [userTokens, setUserTokens] = useState(null)



  const fetchUserTokens = async (address) => {
    const encoded = await fcl
      .send([
        fcl.script`
        import PinataPartyContract from 0xf8d6e0586b0a20c7
        pub fun main(address: Address) : [UInt64] {

          // Voir les NFT de address
          let nftOwner = getAccount(address)  
          let capability = nftOwner.getCapability<&{PinataPartyContract.NFTReceiver}>(/public/NFTReceiver)
      
          let receiverRef = capability.borrow()
              ?? panic("Could not borrow the receiver reference")
      
          return receiverRef.getIDs()
        }
        `,
        fcl.args([
          fcl.arg(address, t.Address)
        ])
      ])
    var decoded = await fcl.decode(encoded)
    console.log(decoded)
    setUserTokens(decoded)
  };
  var verr = 0;
  if(!userTokens){
    fetchUserTokens("0xf8d6e0586b0a20c7");
    verr ++;
  }

  return (
    <div className="token-data">
      <div className="center">
        <button className="btn-primary" onClick={() =>fetchUserTokens("0xf8d6e0586b0a20c7")}>Actualiser</button>
      </div>
      {
        userTokens &&
        <div class="horizontal-scroll-wrapper squares">
          {
            Object.keys(userTokens).map(k => {
              return (
                <TokenData2 tokenId={userTokens[k]}/>       
              )
            })
          }
        </div>   
      }
    </div>
  );
};

export default UserData;