import React, { useState, useEffect } from "react";
import TokenData from './TokenData';
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

const UserData = () => {
  const [userTokens, setUserTokens] = useState(null)
  
  const fetchUserTokens = async (address) => {
    try{
    const encoded = await fcl
      .send([
        fcl.script`
        import WordletContract from 0x1f7da62a915f01c7
        pub fun main(address: Address) : [UInt64] {

          // Voir les NFT de address
          let nftOwner = getAccount(address)  
          let capability = nftOwner.getCapability<&{WordletContract.NFTReceiver}>(/public/NFTReceiver)
      
          let receiverRef = capability.borrow()
              ?? panic("Impossible d'emprunter la Référence Reciever")
      
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
    } 
    catch (error) {
      setUserTokens(null);

      console.log("UserData : Pas de NFT trouvés")
    }
  };

  const [user, setUser] = useState({loggedIn: null})
  useEffect(() => fcl.currentUser().subscribe(setUser), [])

  if(!userTokens && user.addr){
    fetchUserTokens(user.addr);
  }

  return (
    <div className="token-data">
      <div className="center">
        <button className="btn-primary" onClick={() =>fetchUserTokens(user.addr)}>Actualiser</button>
      </div>
      {
        userTokens &&
        <div class="horizontal-scroll-wrapper squares">
          {
            Object.keys(userTokens).map(k => {
              return (
                <TokenData tokenId={userTokens[k]}/>       
              )
            })
          }
        </div>   
      }
    </div>
  );
};

export default UserData;