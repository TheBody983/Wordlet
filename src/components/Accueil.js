import React from 'react'
import * as fcl from "@onflow/fcl"

import { useAuth } from '../providers/AuthProvider';

const Accueil = () => {
    const { user, loggedIn, logOut } = useAuth()
    return(
        <section id="accueil">
            {loggedIn?
                <div id="auth-cluster">
                    <span>{user?.addr ?? "Pas d'Adresse"}</span>
                    <button className="btn-secondary" onClick={ () => logOut() }>Déconnexion</button>
                </div>
            :
                <button className="btn-primary" id="auth-cluster" onClick={fcl.authenticate}>Connexion</button>
            }
            <img src="etoiles.png" id="stars" alt=""/>
            <img src="lune.png" id="moon" style={{mixBlendMode:"screen"}} alt=""/>
            <img src="montagne_derriere.png" style={{marginTop:"500px"}} id="mountains_behind" alt=""/>

        </section>
    )
}

export default Accueil