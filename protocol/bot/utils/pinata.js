const pinataSDK = require('@pinata/sdk');

require('dotenv').config()

const pinata = pinataSDK('1ac4a942639073113f34', process.env.PINATA_PRIVATE_KEY);


const pinImageToIPFS = async (readableStream, id) => await pinata.pinFileToIPFS(readableStream, {
    createdWith: 'DeeART.io',
    id
})
// upload Json
const pinJSONtoIPFS = async (imageHash, igUsername) => await pinata.pinJSONToIPFS(
    {
        image: imageHash,
        description: "",
        name: "",
        attributes: {
            user: igUsername
        }
    }
)

module.exports = {
    pinImageToIPFS,
    pinJSONtoIPFS
}
