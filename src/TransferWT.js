import React from "react";

import TransferWordToken from "./cadence/transferWordToken.tx";

const TransferWT = () => {
    return (
        <div id="setup-account-div">
            <textarea id="ReceiverAddr">0x1f7da62a915f01c7</textarea>
            <textarea id="TokenId">7</textarea>
            <button onClick={() => TransferWordToken(document.getElementById("ReceiverAddr").value, )}>Transfer Token</button>
        </div>
    );
}

export default TransferWT;