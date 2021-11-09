import React from "react";
import Header from "../components/Header";
import Providers from "../providers/Providers.comp";

const Forge = () => {
    return(
        <Providers>
            <Header/>
            <section>
                <h1>Forge en construction...</h1>
                <img src = "lava2.jpg" id = "mountains_front" alt = ""/>
            </section>
        </Providers>
    )
}

export default Forge 