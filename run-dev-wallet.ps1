docker run -it `
    -p 8701:8701 `
    -e PORT=8701 `
    -e FLOW_ACCESS_NODE=http://emulator:8080 `
    -e FLOW_ACCOUNT_KEY_ID=0 `
    -e FLOW_ACCOUNT_PRIVATE_KEY=e350ccf4a28c7cfb5fc0106b79851b775dc9fc417cfecd91188e1568fef5b4af `
    -e FLOW_ACCOUNT_PUBLIC_KEY=1399da96a7f25823a21b5244869851e5b04c4035b99f0e6246284fff6b720380aa886603712b451834318ec42ee5de873644477ccff0d1b5830e30c11a222557 `
    -e FLOW_INIT_ACCOUNTS=0 `
    -e FLOW_ACCOUNT_ADDRESS=0xf8d6e0586b0a20c7 `
    -e FLOW_AVATAR_URL=https://avatars.onflow.org/avatar/ `
    ghcr.io/onflow/fcl-dev-wallet:latest  