// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
var AdmZip = require('adm-zip');

AWS.config.update({region: 'us-east-1'});

const zip = new AdmZip();
const lambdaFile = process.argv[2]
const lambdaName = lambdaFile.replace(/\.js/, '')

zip.addLocalFile(lambdaFile);

// Create the IAM service object
var lambda = new AWS.Lambda();


var params = {
  Code: { /* required */
    ZipFile: zip.toBuffer()
  },
  FunctionName: lambdaName, /* required */
  Handler: `${lambdaName}.handler`, /* required */
  Role: 'arn:aws:iam::141351053848:role/lambda_role', /* required */
  Runtime: 'nodejs12.x', /* required */
  Description: 'Slot machine game results generator',
};
lambda.createFunction(params, function(err, data) {
  if (err) console.log(err); 
  else     console.log(data);         
});

lambda.listFunctions((err, data) => {
  console.log(data.Functions);
})