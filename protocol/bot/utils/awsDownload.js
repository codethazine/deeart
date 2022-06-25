const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')

require('dotenv').config()

AWS.config.update({
    region: 'eu-central-1'
})
const s3 = new AWS.S3({ apiVersion: '2006-03-01' })

const extractKeyFromURI = url => {
    const splitUrl = url.split('/')
    return splitUrl[splitUrl.length - 1]
}

const pullFromAWS = async (imageURL) => {
    console.log(imageURL)
    const key = extractKeyFromURI(imageURL)
    console.log('key:', key)
    const filePath = path.join('/tmp', key);
    console.log(filePath)

    const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: key
    }

    const file = await s3.getObject(params).promise()
    console.log('fileDownloaded')
    fs.writeFileSync(filePath, file.Body)
    // console.log(`${filePath} has been created!`);
    return filePath
};


module.exports = {
    pullFromAWS
}
