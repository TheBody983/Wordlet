import React, {useState, useEffect} from 'react'
import * as fcl from "@onflow/fcl"

import userIsinitialized from '../../cadence/userIsInitialized.script'
import createWOTVault from "../../cadence/createWOTVault.tx";
import createWordletCollection from "../../cadence/createWordletCollection.tx";


const AuthCluster = () => {
	const [user, setUser] = useState({loggedIn: null})
	const [state, setState] = useState("Not Ready")
	useEffect(() => fcl.currentUser().subscribe(setUser), [])
	
	userIsinitialized(user?.addr)
		.then((result)=>{
			if(result) setState("Ready")
		})

	if (user.loggedIn && state === "Ready") {
		return (
			<div id="auth-cluster">
				<span>{user?.addr ?? "Pas d'Adresse"}{state}</span>
				<button className="btn-primary" onClick={fcl.unauthenticate}>Déconnexion</button>
			</div>
			)
	} 
	else if(user.loggedIn){
		return (
			<div id="auth-cluster">
				<span>{user?.addr ?? "Pas d'Adresse"} - {state}</span>
				<button className="btn-primary" onClick={fcl.unauthenticate}>Déconnexion</button>
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
			<button className="btn-primary auth-cluster" onClick={fcl.authenticate}>Connexion</button>
		)
	}
}

export default AuthCluster