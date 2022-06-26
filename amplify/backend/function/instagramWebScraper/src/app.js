/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	API_DEEARTDB_GRAPHQLAPIENDPOINTOUTPUT
	API_DEEARTDB_GRAPHQLAPIIDOUTPUT
	AUTH_DEEARTA59C94C0_USERPOOLID
	ENV
	REGION
	STORAGE_DEEARTSTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


// added constants
const AWS = require("aws-sdk");
// Because the socket timedout at 120000 ms by default
AWS.config.update({
  maxRetries: 1,
  httpOptions: {
      timeout: 900000,
  }
});
console.log(AWS.config);

// Log AWS Config
//const graphql = require('graphql');
const axios = require('axios');
const urlParse = require("url").URL;
const aws4 = require("aws4");
const appSyncUrl = process.env.API_DEEARTDB_GRAPHQLAPIENDPOINTOUTPUT;
const appSyncHost = new urlParse(appSyncUrl).hostname.toString();

let s3Client = null;

if (!s3Client) {
s3Client = new AWS.S3();
}

const bucketName = process.env.STORAGE_DEEARTSTORAGE_BUCKETNAME;
const saveImage = async (_editionCount, canvas, folderName) => {
    const params = {
      Bucket: bucketName,
      Key: folderName + "_collection/images/" + _editionCount + ".png",
      Body: canvas.toBuffer("image/png"),
      ContentType: "image/png",
    };
    let savedImg = await s3Client.upload(params).promise();
    console.log("Saved Image: " + savedImg.Location);
};

const getUsers = async () => {
    const listAccountSettings = /* GraphQL */ `
        query ListAccountSettings(
            $filter: ModelAccountSettingsFilterInput
            $limit: Int
            $nextToken: String
        ) {
            listAccountSettings(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                igUsername
                walletAddress
                defaultETHPrice
                igUniqueID
                userID
                createdAt
                updatedAt
            }
            nextToken
            }
        }
    `;
    query = {
        query: listAccountSettings,
        operationName: "ListAccountSettings",
    };

    request = aws4.sign({method: "POST", url: appSyncUrl, host: appSyncHost, path: "/graphql",
                         headers: {"Content-Type": "application/json"}, service: "appsync",
                         data: query, body: JSON.stringify(query)});
    delete request.headers["Host"];
    delete request.headers["Content-Length"];

    result = await axios(request)
    return result.data;
}    

/****************************
* Example post method *
****************************/

app.post('/item', async function(req, res) {
    //var userSettings = await getUsers();

    // Since there is a permission problem, I'll simulate the userSettings data in the following var
    var userSettings = {
        "items": [
            {
                "id": "5d8f8f8f-8f8f-8f8f-8f8f-8f8f8f8f8f8f",
                "igUsername": "test.deeartist",
                "walletAddress": "0xCA692Ab0c79C61AA1b0b3c0386FA0beb978AEF83",
                "defaultETHPrice": "0.2",
                "igUniqueID": "53612203719",
                "userID": "us-east-1:332bbd90-e2a5-4df8-95ee-005bb7080a6b",
                "createdAt": "2022-06-23T12:16:30.363Z",
                "updatedAt": "2022-06-23T12:16:30.363Z"
            }
        ]
    }

    var igUniqueIDs = {};
    for (var i = 0; i < userSettings.items.length; i++) {
        igUniqueIDs[userSettings.items[i].igUniqueID]["username"] = userSettings.items[i].igUsername;
        igUniqueIDs[userSettings.items[i].igUniqueID]["walletAddress"] = userSettings.items[i].walletAddress;
        igUniqueIDs[userSettings.items[i].igUniqueID]["defaultETHPrice"] = userSettings.items[i].defaultETHPrice;
    }
    console.log(igUniqueIDs);

    var ig = require('instagram-scraping');

    /* things we need to scrape:
        igUsername: String!
        igUniqueID: String!
        ETHPrice: String!
        available: Boolean!
        instagramURL: String!
        imageURL: String!
        userID: ID!
        walletAddress: String!
    */

    var listOfUsers = []
     
    ig.scrapeTag('deeart').then((result) => {
        for (var i = 0; result.medias.length; i++) {
            var media = result.medias[i].node;

            if (igUniqueIDs[media.owner.id] != undefined && media.is_video == false &&
                media.taken_at_timestamp > (Date.now() - (24 * 60 * 60 * 1000))) {
                console.log(i)
                console.log(media.taken_at_timestamp); // Check if it's in the last 24 hours
                console.log(media.is_video); // Check if it's a video
                // if (media.taken_at_timestamp > (Date.now() - (24 * 60 * 60 * 1000))) {
                console.log(media.edge_media_to_caption.edges[0].node.text);

                console.log(media.owner.id); // match it with the database
                // ETHPrice: needs to be retrieved from the AccountSettings table
                // available: is hard coded to true
                console.log(media.display_url); // need to be save to S3 bucket and then used as variable for next var
                // imageURL: see above
                console.log(media.caption);

                var mintedPost = {
                    "igUsername": igUniqueIDs[media.owner.id]["username"],
                    "igUniqueID": media.owner.id,
                    "ETHPrice": igUniqueIDs[media.owner.id]["defaultETHPrice"],
                    "available": true,
                    "instagramURL": media.display_url,
                    "imageURL": media.display_url,
                    "walletAddress": igUniqueIDs[media.owner.id]["walletAddress"],
                }
            }
        }

    });
});


app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
