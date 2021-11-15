import React from "react";

import { Link } from 'react-router-dom';

const Games = () => {
    return(

        <section>
            <div className="card">
                <Link to = "decoy">Decoy</Link>
            </div>
            <img src = "lava1.jpg" id = "mountains_front" alt = ""/>
        </section>
    )
}

export default Games 