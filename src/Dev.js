/* Wordlet

Cet élément sert à tester rapidement des scripts et transactions

*/

import React from "react";
import * as fcl from "@onflow/fcl";

import executeScript from "./cadence/template.script" ;
import sendTransaction from "./cadence/template.tx";

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