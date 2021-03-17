import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

await fcl
  .send([
    fcl.script`
      import PinataPartyContract from 0xf8d6e0586b0a20c7

      pub fun main(address: Address): PinataPartyContract.ReadOnly? {
        return NFTReceiver.getIDs(address)
      }
    `,
    fcl.args([
      fcl.arg("0xf8d6e0586b0a20c7", t.Address), // <-- t.Address this time :)
    ]),
  ])
  .then(fcl.decode)