// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

require('dotenv').config()

async function main() {
    const signers = await ethers.getSigners()
    const abi = [
        "function requestMintNative(string) public payable",
        "event MintRequest(string ipns, address paymentToken)"
    ]
    const posts = new ethers.Contract(process.env.POSTS_CONTRACT_ADDRESS, abi, signers[0])
    const req = await posts.requestMintNative("test7", {
        gasLimit: 30000000,
        value: BigNumber.from('1000000000')
    });
    const receipt = await req.wait()
    console.log(receipt.events.find(el => el.event === 'MintRequest'))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
