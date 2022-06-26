const fs = require('fs');

const { getPostData } = require('./0_postData');
const { pullFromAWS } = require('./1_awsDownload');
const { pinImageToIPFS, pinJSONtoIPFS } = require('./2_pinata');

const uploadToIPFS = async id => {
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
    // return IPNS & data from db
    return {
        hash: jsonData.IpfsHash,
        data
    };
}
module.exports = {
    uploadToIPFS
}
