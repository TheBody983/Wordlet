import React from "react";
import Header from "../components/Header";
import Providers from "../providers/Providers.comp";

const Decoy = () => {
    return(
        <Providers>
            <Header/>
            <section>
                <h1>Le Decoy arrive bientôt</h1>
                <img src="marche.png" id="marche" alt=""/>
            </section>
        </Providers>
    )
}

export default Decoy 