const ethers = require('ethers')
const { parseEther } = require('ethers/lib/utils')
const { uploadToIPFS } = require('./utils')

require('dotenv').config()


const provider = new ethers.providers.WebSocketProvider(process.env.INFURA_WS_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
const contract = new ethers.Contract(
    process.env.POSTS_CONTRACT_ADDRESS,
    [
        "event MintRequest(address indexed requestor,string id,address paymentToken)",
        "function mint((string,string,address,address,address,uint256,address,uint256)) public",
    ],
    wallet
)

const getSeller = async ipns => {
    return '0x0694F03895Aef20A0ED881C561392De938130206'
}
const getAmountToSeller = async ipns => ethers.BigNumber.from('500000000')
const getAmountToFeesCollector = async ipns => ethers.BigNumber.from('500000000')

const NOT_MINTED = null;
const MINTED = 1;

const updatePostStatus = async (id, status) => {
    // update in db
}

const calculateAmounts = ({ ETHPrice }) => {
    const sellerAmount = parseEther(ETHPrice * 0.975);
    const fee = parseEther(ETHPrice * 0.025) // 2.5% fee
    return [sellerAmount, fee];
}

console.log('Listening...')
contract.on('MintRequest', async (requestor, id, paymentToken, event) => {
    console.log(`Received request for ${id} by ${requestor}`);
    const { hash, data } = await uploadToIPFS(id);
    const [sellerAmount, fee] = calculateAmounts(data)
    const mintParams = [
        id,
        hash,
        paymentToken,
        requestor,
        data.walletAddress,
        sellerAmount,
        process.env.FEES_COLLECTOR_ADDRESS,
        fee
    ]
    try {
        await contract.mint(mintParams)
        console.log(`MINTED ${id} to ${ipns} successfully.`)
        updatePostStatus(id, MINTED)
    } catch (err) {
        // TODO - handle error (send email | log to file | other)
        //
        console.log(err)
        updatePostStatus(id, NOT_MINTED)
    }
})
