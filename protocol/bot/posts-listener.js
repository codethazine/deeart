const ethers = require('ethers')
require('dotenv').config()


const provider = new ethers.providers.WebSocketProvider(process.env.INFURA_WS_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

console.log('listening...')

const contract = new ethers.Contract(
    process.env.POSTS_CONTRACT_ADDRESS,
    [
        "event MintRequest(address indexed requestor,string ipns,address paymentToken)",
        "function mint((string,address,address,address,uint256,address,uint256)) public",
        // "function mint((string,address,address,address,uint256,address,uint256)) public",
    ],
    wallet
)

const getSeller = async ipns => '0x0694F03895Aef20A0ED881C561392De938130206'
const getAmountToSeller = async ipns => ethers.BigNumber.from(ethers.BigNumber.from('500000000'))
const getAmountToFeesCollector = async ipns => ethers.BigNumber.from(ethers.BigNumber.from('500000000'))

contract.on('MintRequest', async (requestor, ipns, paymentToken, event) => {
    const mintParams = [
        ipns,
        paymentToken,
        requestor,
        await getSeller(ipns), // TODO - fetch/db interaction
        await getAmountToSeller(ipns), // TODO - fecth/db interaction
        process.env.FEES_COLLECTOR_ADDRESS,
        await getAmountToFeesCollector(ipns) // TODO - fetch/db interaction
    ]
    try {
        const mintTx = await contract.mint(mintParams)
        const txReceipt = await mintTx.wait()
    } catch (err) {
        // TODO - handle error (send email/ log to file/ other)
    }
})
