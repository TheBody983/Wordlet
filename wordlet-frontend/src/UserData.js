import React, { useState } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

const UserData = () => {
  const [nftInfo, setNftInfo] = useState(null)
  const fetchTokenData = async () => {
    const encoded = await fcl
      .send([
        fcl.script`
        import PinataPartyContract from 0xf8d6e0586b0a20c7
        pub fun main(address: Address) : [UInt64] {

          // Voir les NFT de 0xf8d6e0586b0a20c7
          let nftOwner = getAccount(0xf8d6e0586b0a20c7)  
          let capability = nftOwner.getCapability<&{PinataPartyContract.NFTReceiver}>(/public/NFTReceiver)
      
          let receiverRef = capability.borrow()
              ?? panic("Could not borrow the receiver reference")
      
          return receiverRef.getIDs()
        }
        `,
        fcl.args([
          fcl.arg("0xf8d6e0586b0a20c7", t.Address)
        ])
      ])
    var decoded = await fcl.decode(encoded)
    for(let i = 0; i<decoded.length; i++){
      console.log(decoded[i])
        const encoded2 = await fcl
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
              fcl.arg(decoded[i], t.UInt64)
            ])
          ])
        
        // NFTinfos.push(fcl.decode(encoded))
        decoded = await fcl.decode(encoded2)
      
    }
    setNftInfo(decoded)
  };
  return (
    <div className="token-data2">
      <div className="center">
        <button className="btn-primary" onClick={() =>fetchTokenData()}>User en param</button>        
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

export default UserData;