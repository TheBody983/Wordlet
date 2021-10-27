import React, {useState, useEffect} from 'react'
import * as fcl from "@onflow/fcl"

import userIsinitialized from '../../cadence/userIsInitialized.script'
import createWOTVault from "../../cadence/createWOTVault.tx";
import createWordletCollection from "../../cadence/createWordletCollection.tx";
import { useAuth } from '../../providers/AuthProvider';


const AuthCluster = () => {
	const { user, loggedIn, logOut } = useAuth()

	const [state, setState] = useState("Not Ready")
	
	userIsinitialized(user?.addr)
		.then((result)=>{
			if(result) setState("Ready")
		})

	if (loggedIn && state === "Ready") {
		return (
			<div id="auth-cluster">
				<span>{user?.addr ?? "Pas d'Adresse"} - {state}</span>
				<button className="btn-secondary" onClick={ () => logOut }>Déconnexion</button>
			</div>
			)
	} 
	else if(loggedIn){
		return (
			<div id="auth-cluster">
				<span>{user?.addr ?? "Pas d'Adresse"} - {state}</span>
				<button className="btn-secondary" onClick={fcl.unauthenticate}>Déconnexion</button>
				<div id="setup-account-div">
					<p> Setup </p>
					<button onClick={() => createWOTVault()}>WOToken</button>
					<button onClick={() => createWordletCollection()}>Wordlet Wallet</button>
				</div>
			</div>
			)
	}
	else {
		return (
			<button className="btn-primary" id="auth-cluster" onClick={fcl.authenticate}>Connexion</button>
		)
	}
}

export default AuthCluster