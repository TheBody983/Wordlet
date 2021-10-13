/* Wordlet

Cet élément sert à tester rapidement des scripts et transactions
*/

import React from "react";
import * as fcl from "@onflow/fcl";

import executeScript from "./dev.executeScript" ;
import sendTransaction from "./dev.sendTransaction";

const afficherConfig = async () => {
    console.log(await fcl.config().all())
}


const Dev = () => {
    return (
        <div id="dev-div">
            <button onClick={() => afficherConfig()}>Config</button>
            <button onClick={() => executeScript()}>Script</button>
            <button onClick={() => sendTransaction()}>Transaction</button>
        </div>
    );
}

export default Dev;