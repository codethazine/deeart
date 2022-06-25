const pinataSDK = require('@pinata/sdk');

require('dotenv').config()

const pinata = pinataSDK('1ac4a942639073113f34', process.env.PINATA_PRIVATE_KEY);


const pinImageToIPFS = async (readableStream, id) => {
    const data = await pinata.pinFileToIPFS(readableStream, {
        createdWith: 'DeeART.io',
        id
    })
    console.log(data)
    return data
}
// upload Json
const pinJSONtoIPFS = async (imageHash, igUsername) => {
    const data = await pinata.pinJSONToIPFS(
        {
            image: imageHash,
            description: "",
            name: "",
            attributes: {
                user: igUsername,
                createdWith: 'DeeART.io'
            }
        }
    )
    console.log(data)
    return data
}

module.exports = {
    pinImageToIPFS,
    pinJSONtoIPFS
}
