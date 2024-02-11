const hre = require("hardhat")
var fs = require("fs")
const BN = require("bignumber.js")

const {
  syncDeployInfo,
  deployContract,
  deployContractAndProxy
} = require("./deploy")
const { addressZero, bytes32Zero, maxUint256 } = require("./const")

const deploy_bsctestnet = async () => {
  let network = "bsctestnet"

  let totalRet = []
  try {
    let readInfo = fs.readFileSync(`migrations/deploy-${network}.json`)
    totalRet = JSON.parse(readInfo)
  } catch (err) {
    console.log(`${err.message}`)
  }
  // console.log(totalRet)

  let vestingFactoryInfo = totalRet.find(t => t.name === "VestingFactory")
  let multisigWalletInfo = totalRet.find(t => t.name === "MultisigWallet")
  let myTestTokenInfo = totalRet.find(t => t.name === "MyTestToken")

  /* deploy */
  vestingFactoryInfo = await deployContract("VestingFactory", '0x55113221f0Af31aF991d6f1A72dCEe7450a3CF61', '0xF60A99830eE5b15Eac36242823F4a37814CE98e1', BN(500).toString())
  totalRet = syncDeployInfo(network, "VestingFactory", vestingFactoryInfo, totalRet)

  multisigWalletInfo = await deployContract("MultisigWallet",
    ['0xF60A99830eE5b15Eac36242823F4a37814CE98e1', '0x204F6D51E7BE61e569d223Bd41453f84Bc40a558'], 2)
  totalRet = syncDeployInfo(network, "MultisigWallet", multisigWalletInfo, totalRet)

  myTestTokenInfo = await deployContract("MyTestToken", "Token1", "MTT1", BN(`100e18`).toString())
  totalRet = syncDeployInfo(network, "MyTestToken", myTestTokenInfo, totalRet)

  console.log("deployed contracts successfully")
}

module.exports = { deploy_bsctestnet }