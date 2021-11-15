import React from "react";
import Header from "../components/Header";
import Providers from "../providers/Providers.comp";
import Forge from '../components/Forge';
import ForgedTokenCollection from '../components/ForgedTokenCollection';

const ForgeApp = () => {
    return(
        <Providers>
            <Header/>
            <Forge />
            <ForgedTokenCollection />

        </Providers>
    )
}

export default ForgeApp