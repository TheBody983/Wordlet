import React from "react";
import Header from "../components/Header";
import Providers from "../providers/Providers.comp";
import Forge from '../components/Forge';
import Forge2556 from '../components/Forge2.5.56';
import ForgedTokenCollection from '../components/ForgedTokenCollection';


const ForgeApp = () => {
    return(
        <Providers>
            <Header/>
            <Forge />
            <ForgedTokenCollection />
			<Forge2556 />
        </Providers>
    )
}

export default ForgeApp