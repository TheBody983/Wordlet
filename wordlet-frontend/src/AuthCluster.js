import React, {useState, useEffect} from 'react'
import * as fcl from "@onflow/fcl"

const AuthCluster = () => {
	const [user, setUser] = useState({loggedIn: null})
	useEffect(() => fcl.currentUser().subscribe(setUser), [])
	if (user.loggedIn) {
		return (
			<div>
				<button className="btn-primary" onClick={fcl.unauthenticate}>Déconnexion</button>
			</div>
			)
			/*return (
				<div>
					<span>{user?.addr ?? "Pas d'Adresse"}</span>
					<button className="btn-primary" onClick={fcl.unauthenticate}>Déconnexion</button>
				</div>
				)*/
	} else {
		return (
		<div>
			<button className="btn-primary" onClick={fcl.authenticate}>Connexion</button>
		</div>
		)
	}
}

export default AuthCluster