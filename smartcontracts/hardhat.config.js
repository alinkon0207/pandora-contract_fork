require("@nomicfoundation/hardhat-toolbox");

const {
  ODYSSEY_DEPLOY_KEY,
  // DIONE_DEPLOY_KEY
} = require("./env.json")

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners()

  for (const account of accounts) {
    console.info(account.address)
  }
})

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
      gasPrice: 110000000000,
      timeout: 120000
    },
    hardhat: {
      // allowUnlimitedContractSize: true
    },
    odyssey: {
      url: "https://testnode.dioneprotocol.com/ext/bc/C/rpc",
      chainId: 13,
      gasPrice: 25000000000, // 25 gwei
      accounts: [ODYSSEY_DEPLOY_KEY]
    },
    bsctestnet: {
      url: "https://bsc-testnet.publicnode.com",
      chainId: 97,
      gasPrice: 25000000000, // 25 gwei
      accounts: [ODYSSEY_DEPLOY_KEY]
    },
    mumbai: {
      url: "https://polygon-mumbai-pokt.nodies.app",
      chainId: 80001,
      gasPrice: 25000000000, // 25 gwei
      accounts: [ODYSSEY_DEPLOY_KEY]
    },
  },
  etherscan: {
    apiKey: {
      odyssey: 'AIW87TX33382ST7YH1BHQI8N3D1DCN6UN7'
      // mainnet: MAINNET_DEPLOY_KEY,
    }
  },
  solidity: {
    version: "0.8.20",
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
};
