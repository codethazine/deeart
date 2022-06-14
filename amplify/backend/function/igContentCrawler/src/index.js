/* Amplify Params - DO NOT EDIT
	API_DEEART_GRAPHQLAPIENDPOINTOUTPUT
	API_DEEART_GRAPHQLAPIIDOUTPUT
	AUTH_DEEARTB8122D29_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const request = require('request-promise');
    const cheerio = require('cheerio');

    /* Create the base function to be ran */
    const start = async () => {
        	
        const rp = require('request-promise');
        const cheerio = require('cheerio');
         
        let keyWord = "developers"
         
        let URL = `https://www.instagram.com/explore/tags/${keyWord}/`
         
        rp(URL)
            .then((html) => {
                let hashtags = scrapeHashtags(html);
                hashtags = removeDuplicates(hashtags);
                hashtags = hashtags.map(ele => "#" + ele)
                console.log(hashtags);
            })
            .catch((err) => {
                console.log(err);
            });
         
        const scrapeHashtags = (html) => {  
            var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
            var matches = [];
            var match;
         
            while ((match = regex.exec(html))) {
                matches.push(match[1]);
            }
         
            return matches;
        }
         
        const removeDuplicates = (arr) => {
            let newArr = [];
         
            arr.map(ele => {
                if (newArr.indexOf(ele) == -1){
                    newArr.push(ele)
                }
            })
             
            return newArr;
        }        

    }

    await start();


    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify('Hello from Lambda!'),
        //body: script,
    };
};
