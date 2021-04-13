/* eslint-disable no-console */

const AWSWrapper = require('./aws');

(async () => {
  const [bucketErr, bucketData] = await AWSWrapper.createBucket('angelbtestbuc2')
  console.log(bucketErr)
  console.log(bucketData)

  const [lambdaErr, lambdaData] = await AWSWrapper.createLambda('./aws/uploadToBucket.js', 'arn:aws:iam::141351053848:role/lambda_role')
  console.log(lambdaErr)
  console.log(lambdaData)

  const [policyErr, policyData] = await AWSWrapper.setLambdaInvokePolicy('arn:aws:lambda:us-east-1:141351053848:function:uploadToBucket')
  console.log(policyErr)
  console.log(policyData)

  const [triggerErr, triggerData] = await AWSWrapper.createS3LambdaTrigger('angelbtestbuc', 'arn:aws:lambda:us-east-1:141351053848:function:uploadToBucket')
  console.log(triggerErr)
  console.log(triggerData)

  const [uploadErr, uploadData] = await AWSWrapper.uploadToBucket('angelbtestbuc', './aws/listLambdas.js')
  console.log(uploadErr)
  console.log(uploadData)

  const [credentialsErr, credentials] = await AWSWrapper.getCredentials()
  console.log(credentialsErr)
  console.log(credentials)

  const [listLambdaErr, lamdas] = await AWSWrapper.listLambdas()
  console.log(listLambdaErr)
  console.log(lamdas)
})()

module.exports = require('@oclif/command')

