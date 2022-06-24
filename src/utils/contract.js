import { ethers, utils, constants } from 'ethers'
import { store } from '@/store'
import { utils } from '@aws-amplify/datastore'

const abi = [
    "function requestMintNative(string id) payable",
    "function requestMint(string id,address token, uint256 amount)",
    "function supplied(address account, address asset) returns (uint)",
    "function withdraw(address asset, uint256 amount)"
]

export const contract = new ethers.Contract(
    process.env.POSTS_CONTRACT_ADDRESS,
    abi,
    new ethers.getDefaultProvider(process.env.INFURA_URL)
)

export const connectedContract = () => {
    const signers = await ethers.getSigners()
    contract.connect(signers[0])
}


export const getSuppliedAmount = async (account, token) => {
    const res = await contract.supplied(account, token || constants);
    return utils.formatEther(res);
}

export const submitMintRequest = async (id, token, amount) => {
    const contract = connectedContract()
    try {

        if (token) {
            await contract.requestMintNative(id, { value: utils.parseEther(amount) });
        } else {
            await contract.requestMint(id, token, utils.parseEther(amount));
        }
    } catch (err) {
        console.err(err)
    }
}

export const withdrawFunds = async (token, amount) => {
    const contract = connectedContract();
    try {
        await contract.withdraw(token, parseEther(amount));
    } catch (err) {
        console.log(err)
    }
}
