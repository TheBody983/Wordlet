import {config} from "@onflow/fcl"
config()
.put("accessNode.api", "http://localhost:8080") 
.put("challenge.handshake", process.env.REACT_APP_WALLET_DISCOVERY) 
.put("0xEmulator", process.env.REACT_APP_CONTRACT_PROFILE)