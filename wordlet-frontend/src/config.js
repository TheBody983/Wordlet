import {config} from "@onflow/fcl"
config()
.put("accessNode.api", process.env.REACT_APP_ACCESS_NODE) 
.put("discovery.wallet", process.env.REACT_APP_WALLET_DISCOVERY)
.put("challenge.handshake", process.env.REACT_APP_WALLET_DISCOVERY)
.put("0xWordlet", "0x1f7da62a915f01c7")