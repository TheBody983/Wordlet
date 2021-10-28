import React, {useState, useEffect} from 'react'
import * as fcl from "@onflow/fcl"

import { useAuth } from '../../providers/AuthProvider';
import { useUser } from '../../providers/UserProvider';

const Accueil = () => {
    const { user, loggedIn, logOut } = useAuth()
    return(
        <>
            <h1 id="wordlet-title">Wordlet</h1>
            {loggedIn?
                <div id="auth-cluster">
                    <span>{user?.addr ?? "Pas d'Adresse"}</span>
                    <button className="btn-secondary" onClick={ () => logOut() }>Déconnexion</button>
                </div>
            :
                <button className="btn-primary" id="auth-cluster" onClick={fcl.authenticate}>Connexion</button>
            }
        </>
    )
}

export default Accueil