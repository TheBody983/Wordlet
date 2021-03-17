import React, { useState } from "react";
import * as fcl from "@onflow/fcl";

const TokenData = () => {
  const [nftInfo, setNftInfo] = useState(null)
  const fetchTokenData = async () => {
    const encoded = await fcl
      .send([
        fcl.script`
        import PinataPartyContract from 0xf8d6e0586b0a20c7
        pub fun main() : {String : String} {
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
  return (
    <div className="token-data">
      <div className="center">
        <button className="btn-primary" onClick={fetchTokenData}>Fetch Token Data</button>        
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
            <video id="nft-video" canplaythrough controls width="85%">
              <source src={`https://ipfs.io/ipfs/${nftInfo["uri"].split("://")[1]}`}
                    type="video/mp4" />
            </video>
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