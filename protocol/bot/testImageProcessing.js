const fs = require('fs')

const { pullFromAWS } = require('./utils/awsDownload');
const { pinImageToIPFS, pinJSONtoIPFS } = require('./utils/pinata');
const { getPostData } = require('./utils/postData');


const uploadToIPFS = async id => {
    // fetch data from DB
    const data = await getPostData(id)
    // pull from s3
    const fileName = await pullFromAWS(data.imageURL)
    const readableStream = fs.createReadStream(fileName);
    // console.log(readableStream)
    // upload image to IPFS
    const imageData = await pinImageToIPFS(readableStream, id)
    console.log(imageData)
    // // upload Json
    const jsonData = await pinJSONtoIPFS(imageData.IpfsHash, data.igUsername)
    // return IPNS
    console.log(jsonData)
    return jsonData.IpfsHash;
}

uploadToIPFS('2345678')
