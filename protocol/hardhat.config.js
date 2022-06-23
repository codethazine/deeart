const { task } = require("hardhat/config");
const { BigNumber} = require('ethers')

require('dotenv').config()
require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task('deploy-posts', "Deploys the Posts contract", async (taskArgs, hre) => {
  const Posts = await hre.ethers.getContractFactory("Posts");
  const posts = await Posts.deploy("http://localhost:3000/");
  await posts.deployed();
  console.log(`Posts deployed to ${posts.address}`)
})

task("request-mint", "request minting on Posts contract")
.addParam("posts", "the address of the Posts contract")
.setAction(async (taskArgs, hre) => {
  const abi = [
    "function requestMint(string) public payable"
  ];
  const signers = await hre.ethers.getSigners()
  const posts = new ethers.Contract(taskArgs.posts, abi, signers[0]);
  await posts.requestMint("helloWorld", {
    value: BigNumber.from('1')
  });
})


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: 'hardhat',
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545"
      // gasLimit: 3000000000,
      // defaultBalanceEther: 100000,
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    kovan : {
      url: process.env.INFURA_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
