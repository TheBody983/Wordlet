import React from "react";

import createWOTVault from "../../cadence/createWOTVault.tx";
import linkWOTVault from "../../cadence/linkWOTVault.tx";
import createWordletCollection from "../../cadence/createWordletCollection.tx";

const SetupAccount = () => {
    return (
        <div id="setup-account-div">
            <button onClick={() => createWOTVault()}>Create Vault</button>
            <button onClick={() => linkWOTVault()}>Link Vault</button>
            <button onClick={() => createWordletCollection()}>Create Collection</button>
        </div>
    );
}

export default SetupAccount;