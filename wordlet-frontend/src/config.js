import {config} from "@onflow/fcl"
config()
.put("accessNode.api", process.env.REACT_APP_ACCESS_NODE) 
.put("discovery.wallet", process.env.REACT_APP_WALLET_DISCOVERY)
.put("challenge.handshake", process.env.REACT_APP_WALLET_DISCOVERY)