import React, {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"
import './AuthCluster.css';

export function AuthCluster() {
  const [user, setUser] = useState({loggedIn: null})
  useEffect(() => fcl.currentUser().subscribe(setUser), [])

  if (user.loggedIn) {
    return (
      <div>
        <span>{user?.addr ?? "Pas d'Addresse"}</span>
        <button onClick={fcl.unauthenticate}>Se déconnecter</button>
      </div>
    )
  } else {
    return (
      <div>
        <button onClick={fcl.logIn}>Connexion</button>
      </div>
    )
  }
}

export default AuthCluster;