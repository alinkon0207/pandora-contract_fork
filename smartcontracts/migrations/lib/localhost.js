const hre = require("hardhat")
var fs = require("fs")
const BN = require("bignumber.js")

const {
  syncDeployInfo,
  deployContract,
  deployContractAndProxy
} = require("./deploy")
const { addressZero, bytes32Zero, maxUint256 } = require("./const")

const deploy_localhost = async (specialAccounts) => {
  let network = 'localhost'
  const { admin/* , proxyAdmin */ } = specialAccounts
  console.log('admin:', admin)
  // console.log('proxyAdmin:', proxyAdmin)

  let totalRet = []
  try {
    let readInfo = fs.readFileSync(`migrations/deploy-${network}.json`)
    totalRet = JSON.parse(readInfo)
  } catch (err) {
    console.log(`${err.message}`)
  }
  // console.log(totalRet)

  let pandoraInfo = totalRet.find(t => t.name === "Pandora")
  
  /* deploy */
  pandoraInfo = await deployContract("Pandora", admin)
  totalRet = syncDeployInfo(network, "Pandora", pandoraInfo, totalRet)

  console.log("deployed contracts successfully")
}

module.exports = { deploy_localhost }