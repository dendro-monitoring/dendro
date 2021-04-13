const fs = require('fs');
const path = require('path')
const AWS = require('aws-sdk');
const AdmZip = require('adm-zip');

function createLambda(lambdaFile, Role, callback, Runtime = "nodejs12.x", Description = "", region = "us-east-1") {
  AWS.config.update({region});

  const lambdaName = lambdaFile.replace(/\.js/, '')

  if (!fs.existsSync(lambdaFile)) { throw new Error("Can't find lambda file") }

  const zip = new AdmZip();

  zip.addLocalFile(lambdaFile);

  var lambda = new AWS.Lambda();

  var params = {
    Code: { /* required */
      ZipFile: zip.toBuffer()
    },
    FunctionName: path.basename(lambdaName), /* required */
    Handler: `${lambdaName}.handler`, /* required */
    Role, /* required */
    Runtime: Runtime, /* required */
    Description,
  };

  lambda.createFunction(params, callback);
}

module.exports = createLambda