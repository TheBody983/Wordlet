import {config} from "@onflow/fcl"
config()
.put("accessNode.api", process.env.REACT_APP_ACCESS_NODE) 
.put("challenge.handshake", process.env.REACT_APP_WALLET_DISCOVERY)