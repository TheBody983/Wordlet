import {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

window.fcl = fcl
window.t = t

window.addEventListener("FLOW::TX", d => {
  console.log("FLOW::TX", d.detail.delta, d.detail.txId)
  fcl
    .tx(d.detail.txId)
    .subscribe(txStatus => console.log("TX:STATUS", d.detail.txId, txStatus))
})

window.addEventListener("message", d => {
  console.log("Harness Message Received", d.data)
})

// prettier-ignore
fcl.config()
  .put("app.detail.title", "Test Harness")
  .put("app.detail.icon", "https://i.imgur.com/r23Zhvu.png")
  .put("service.OpenID.scopes", "email email_verified name zoneinfo")

if (true) {
  // prettier-ignore
  fcl.config()
    .put("env", "local")
    .put("accessNode.api", "http://localhost:8080")
    .put("discovery.wallet", "http://localhost:3000/fcl/authn")
    .put("challenge.handshake", "http://localhost:3000/fcl/authn")
} else {
  // prettier-ignore
  fcl.config()
    .put("env", "testnet")
    .put("accessNode.api", "https://access-testnet.onflow.org")
}

const script = async () => {
  return fcl
    .send([
      fcl.script`
      pub fun main(a: Int, b: Int): Int {
        return a + b
      }
    `,
      fcl.args([fcl.arg(7, t.Int), fcl.arg(9, t.Int)]),
    ])
    .then(fcl.decode)
    .then(d => console.log("SX", d))
}

const tx = async () => {
  return fcl
    .send([
      fcl.transaction`
      transaction(a: Int, b: Int) {
        prepare(acct: AuthAccount) {
          log(a + b)
          log(acct.address)
        }
      }
    `,
      fcl.args([fcl.arg(5, t.Int), fcl.arg(9, t.Int)]),
      fcl.proposer(fcl.authz),
      fcl.payer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(15),
    ])
    .then(fcl.decode)
    .then(d => console.log("TX", d))
    .catch(err => console.error("Oh No!! --", err))
}

const BTNS = [
  ["Log In", fcl.reauthenticate],
  ["Log Out", fcl.unauthenticate]//,
  //["Script", script],
  //["Tx", tx],
]

export default function Root() {
  const [currentUser, setCurrentUser] = useState(null)
  useEffect(() => fcl.currentUser().subscribe(setCurrentUser), [])
  const [config, setConfig] = useState(null)
  useEffect(() => fcl.config().subscribe(setConfig), [])
  return(<div>bite</div>)
  /*
  return (
    <div>
      <ul>
        {BTNS.map(([label, onClick], i) => (
          <li key={i}>
            <button onClick={onClick}>{label}</button>
          </li>
        ))}
      </ul>
      <pre>{JSON.stringify({currentUser, config}, null, 2)}</pre>
    </div>
  )*/
}
