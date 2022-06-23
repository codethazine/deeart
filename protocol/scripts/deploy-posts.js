// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const fs = require('fs')


async function main() {
  const Posts = await hre.ethers.getContractFactory("Posts");
  const posts = await Posts.deploy("http://localhost:3000/");

  await posts.deployed();

  console.log(`POSTS=${posts.address}`);
  fs.writeFileSync(
    '../.env',
    `POSTS=${posts.address}\n`
    )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
