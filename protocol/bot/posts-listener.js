const ethers = require('ethers')
const fs = require('fs');

const { pullFromAWS } = require('./utils/awsDownload');
const { pinImageToIPFS, pinJSONtoIPFS } = require('./utils/pinata');
const { getPostData } = require('./utils/postData');

require('dotenv').config()


const provider = new ethers.providers.WebSocketProvider(process.env.INFURA_WS_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
const contract = new ethers.Contract(
    process.env.POSTS_CONTRACT_ADDRESS,
    [
        "event MintRequest(address indexed requestor,uint256 id,address paymentToken)",
        "function mint((uint,address,address,address,uint256,address,uint256)) public",
    ],
    wallet
)

const getSeller = async ipns => '0x0694F03895Aef20A0ED881C561392De938130206'
const getAmountToSeller = async ipns => ethers.BigNumber.from(ethers.BigNumber.from('500000000'))
const getAmountToFeesCollector = async ipns => ethers.BigNumber.from(ethers.BigNumber.from('500000000'))

const uploadToIPFS = async id => {
    // fetch data from DB
    // fetch data from DB
    const data = await getPostData(id)
    // pull from s3
    const fileName = await pullFromAWS(data.imageURL)
    const readableStream = fs.createReadStream(fileName);
    // console.log(readableStream)
    // upload image to IPFS
    const imageData = await pinImageToIPFS(readableStream, id)
    // // upload Json
    const jsonData = await pinJSONtoIPFS(imageData.IpfsHash, data.igUsername)
    // return IPNS
    return jsonData.IpfsHash;
}

const NOT_MINTED = null;
const MINTED = 1;

const setPostAs = async (id, status) => {
    // update in db
}

console.log('Listening...')
contract.on('MintRequest', async (requestor, id, paymentToken, event) => {
    const ipns = await uploadToIPFS(id);
    const mintParams = [
        id,
        ipns,
        paymentToken,
        requestor,
        await getSeller(id), // TODO - fetch/db interaction
        await getAmountToSeller(id), // TODO - fecth/db interaction
        process.env.FEES_COLLECTOR_ADDRESS,
        await getAmountToFeesCollector(id) // TODO - fetch/db interaction
    ]
    try {
        const mintTx = await contract.mint(mintParams)
        console.log(`MINTED ${ipns} successfully.`)
        setPostAs(id, MINTED)
    } catch (err) {
        // TODO - handle error (send email/ log to file/ other)
        //
        setPostAs(id, NOT_MINTED)
    }
})
