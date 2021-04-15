const fs = require('fs')

const path = require('path')
const AWS = require('aws-sdk')
const AdmZip = require('adm-zip')

function createLambda({
  lambdaFile,
  Role,
  Runtime = 'nodejs12.x',
  region = 'us-east-1',
  Description = '',
}) {
  return new Promise(resolve => {
    AWS.config.update({ region })

    const lambdaName = lambdaFile.replace(/\.js/, '')

    if (!fs.existsSync(lambdaFile)) {
      throw new Error("Can't find lambda file")
    }

    const zip = new AdmZip()

    zip.addLocalFile(lambdaFile)

    const lambda = new AWS.Lambda()

    const params = {
      Code: { /* required */
        ZipFile: zip.toBuffer(),
      },
      FunctionName: path.basename(lambdaName), /* required */
      Handler: `${lambdaName}.handler`, /* required */
      Role, /* required */
      Runtime, /* required */
      Description,
    }

    lambda.createFunction(params, (err, data) => {
      resolve([err, data])
    })
  })
}

module.exports = createLambda
