// File: ./src/auth-cluster.js

import React, {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"
import './AuthCluster.css';

export function AuthCluster() {
  const [user, setUser] = useState({loggedIn: null})
  useEffect(() => fcl.currentUser().subscribe(setUser), [])

  if (user.loggedIn) {
    return (
      <div>
        <span>{user?.addr ?? "No Address"}</span>
        <button onClick={fcl.unauthenticate}>Se déconnecter</button>
      </div>
    )
  } else {
    return (
      <div>
        <button onClick={fcl.reauthenticate}>Se connecter/S'inscrire</button>
      </div>
    )
  }
}

export default AuthCluster;