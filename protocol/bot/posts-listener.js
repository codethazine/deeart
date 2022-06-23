const ethers = require('ethers')
require('dotenv').config()

// const ganache = require('ganache-core')
const provider = new ethers.providers.WebSocketProvider('wss://rinkeby.infura.io/ws/v3/f4ec2131c2e045c9af0a5a0e705f5390')
console.log('listening...')
const contract = new ethers.Contract(
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    [
        "event  Approval(address indexed src, address indexed guy, uint wad)",
        "event  Transfer(address indexed src, address indexed dst, uint wad)",
        "event  Deposit(address indexed dst, uint wad)",
        "event  Withdrawal(address indexed src, uint wad)"
    ],
    provider
)

// while (true) {
contract.on('*', (...args) => console.log(args))
// }
