const covalent = require('covalentjs');
require('dotenv').config()

async function main() {

    const res = await covalent.classA.getLogEventsByContractAddress(process.env.CHAIN_ID, process.env.POSTS_CONTRACT_ADDRESS, {
        'starting-block': 32368000,
        'ending-block': 'latest'

    })
    console.log(res.data.items.map(el => el.decoded?.params))
}

main()
