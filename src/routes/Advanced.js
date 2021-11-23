import React from "react";
import Header from "../components/Header";
import AdvancedComponent from "../components/AdvancedComponent";

import Providers from "../providers/Providers.comp";

const Advanced = () => {
    return(
        <Providers>
            <Header/>
            <AdvancedComponent />
        </Providers>
    )
}

export default Advanced 