import React from "react";

import { useUser } from "../providers/UserProvider";

const Forge = () => {

    const { mintForgedToken } = useUser( )

    return(
        <section id="forge">
            <div className="card">
                <label>ID des mots à forger</label>
				<input type="text" id="WordTokenIds" placeholder="ex : 1,2,5"/>
				<button onClick={() => mintForgedToken(document.getElementById("WordTokenIds").value.split(',').map(Number))}>Forger</button> 
            </div>
            <img src="lava1.jpg" id="mountains_front" alt=""/>
        </section>
    )
}

export default Forge