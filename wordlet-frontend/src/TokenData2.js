import React, { useState } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

const TokenData2 = (props) => {
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
  return (
    <div className="token-data">
      <div className="center">
        <button className="btn-primary" onClick={() =>fetchTokenData(props.tokenId)}>Token {props.tokenId}</button>        
      </div>
      {
        nftInfo &&
        <div>
          {
            Object.keys(nftInfo).map(k => {
              return (
                <p>{k}: {nftInfo[k]}</p>
              )
            })
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

export default TokenData2;