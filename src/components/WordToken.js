import React, { useState, useEffect } from "react";
import { useAuth } from "../providers/AuthProvider";

import { useUser } from "../providers/UserProvider";

const WordToken = (props) => {
    const { user } = useAuth( )
    const { getTokenData, transferWordToken, buyWordtoken, listTokenForSale, removeTokenFromSale, getTokenPrice } = useUser( )
    const [tokenData, setTokenData] = useState({})
    const [display, setDisplay] = useState(false)
    const [tokenPrice, setTokenPrice] = useState(null)
    
    useEffect(() => {
        getTokenData(setTokenData, props.tokenId)
        getTokenPrice(props.seller?props.seller:user?.addr, props.tokenId, setTokenPrice)
    }, [ display ])

    if(!display){
        return (
            <div >
                <button  onClick={() =>setDisplay(true)}>WordToken #{props.tokenId}</button>
            </div>
        )
    }

    return (
        <div className="card" key={props.tokenId}>
            {tokenData &&
            <div>
                <p key="mot">Mot: {tokenData["mot"]}</p>
                <p key="tokenId">Token #{props.tokenId}</p>
                <p key="type">Type: {tokenData["type"]}</p>
                <p key="source">Source: {tokenData["source"]}</p>
            </div>
            } {props.collection &&
            <>
            <div>
                <label>Receiver address : </label>
                <input type="text" id="ReceiverAddr" placeholder="Entrez un destinataire"/>
                <button onClick={() => transferWordToken(document.getElementById("ReceiverAddr").value, props.tokenId)}>Transfer Token</button> 
            </div>
            <div>
                <label>Prix : </label>
                <input type="text" id="price" placeholder="Entrez un prix"/>
                <button  onClick={() => listTokenForSale(props.tokenId, document.getElementById("price").value)}>Vendre le token</button> 
            </div>
            </>
            } {props.market &&
            <>
            <div>
                <h4>Price</h4>
                <p>{tokenPrice} WOT</p>
            </div>
            <div>
                <p>Seller: {props.seller}</p>
                <button onClick={() => buyWordtoken(props.tokenId, props.seller)}>Acheter</button>
            </div>
            </>
            } {props.forSale &&
            <>
            <div>
                <label>Prix : </label>
                <p>{tokenPrice} WOT</p>
                <button className="btn-primary" onClick={() => removeTokenFromSale(props.tokenId)}>Retirer de la vente</button> 
            </div>
            </>

        }
            <div>
                <button onClick={() => setDisplay(false)}>Clear Token Info</button>
            </div>

        </div>
    );
};

export default WordToken;