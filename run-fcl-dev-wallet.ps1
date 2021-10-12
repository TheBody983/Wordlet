docker run -it `
    -p 8701:8701 `
    -e PORT=8701 `
    -e FLOW_ACCESS_NODE=http://emulator:8080 `
    -e FLOW_ACCOUNT_KEY_ID=0 `
    -e FLOW_ACCOUNT_PRIVATE_KEY=e350ccf4a28c7cfb5fc0106b79851b775dc9fc417cfecd91188e1568fef5b4af  `
    -e FLOW_ACCOUNT_PUBLIC_KEY=519e9fbf966c6589fafe60903c0da5f55c5cb50aee5d870f097b35dfb6de13c170718cd92f50811cdd9290e51c2766440b696e0423a5031ae482cca79e3c479  `
    -e FLOW_INIT_ACCOUNTS=1 `
    -e FLOW_ACCOUNT_ADDRESS=0xf8d6e0586b0a20c7 `
    -e FLOW_AVATAR_URL=https://avatars.onflow.org/avatar/ `
    ghcr.io/onflow/fcl-dev-wallet:latest  