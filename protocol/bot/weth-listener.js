const ethers = require('ethers')
require('dotenv').config()

const provider = new ethers.providers.WebSocketProvider(process.env.INFURA_WS_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

console.log('listening...')
const contract = new ethers.Contract(
    '0xd0A1E359811322d97991E03f863a0C30C2cF029C',// Rinkeby WETH address
    [
        "event  Approval(address indexed src, address indexed guy, uint wad)",
        "event  Transfer(address indexed src, address indexed dst, uint wad)",
        "event  Deposit(address indexed dst, uint wad)",
        "event  Withdrawal(address indexed src, uint wad)",
    ],
    wallet
)

contract.on('Approval', (...args) => console.log('APPROVAL\n', args))
contract.on('Transfer', (...args) => console.log('TRANSFER\n', args))
contract.on('Deposit', (...args) => console.log('DEPOSIT\n', args))
contract.on('Withdrawal', (...args) => console.log('WITHDRAWAL\n', args))
