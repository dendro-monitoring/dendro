/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const AWSWrapper = require('./aws')

const newRoleName = 'dendro-lambda-role'
const newBucketName = 'dendrodefaultbucket'
const pathToLambdaFunc = './aws/lambda/_deployableLambdaFunction.js'
const fileToUpload = './aws/s3/uploadToBucket.js';

(async () => {
  console.log('Creating new lambda role...')
  const [lambdaRoleErr, lambdaRole] = await AWSWrapper.createLambdaRole(newRoleName)
  if (lambdaRoleErr) {
    console.error(lambdaRoleErr)
  } else {
    console.log('success')
  }
  console.log(lambdaRole.Role.Arn)

  console.log('Attaching AWSLambdaBasicExecutionRole...')
  const [attachPolicyErr, attachPolicyData] = await AWSWrapper.attachLambdaBasicExecutionPolicy(newRoleName)
  if (attachPolicyErr) {
    console.error(attachPolicyErr)
  } else {
    console.log('success')
  }
  // console.log(attachPolicyData)

  console.log('Creating new lambda...')
  const [lambdaErr, lambdaData] = await AWSWrapper.createLambda(pathToLambdaFunc, 'arn:aws:iam::141351053848:role/dendro-lambda-role')
  if (lambdaErr) {
    console.error(lambdaErr)
  } else {
    console.log('success')
  }
  console.log(lambdaData)

  console.log('Creating new bucket...')

  const [bucketErr, bucketData] = await AWSWrapper.createBucket(newBucketName)
  if (bucketErr) {
    console.error(bucketErr)
  } else {
    console.log('success')
  }
  // console.log(bucketData)

  console.log('Setting lambda invoke policy...')
  const [policyErr, policyData] = await AWSWrapper.setLambdaInvokePolicy(lambdaData.FunctionArn)
  if (policyErr) {
    console.error(policyErr)
  } else {
    console.log('success')
  }
  // console.log(policyData)

  console.log('Creating S3 trigger...')
  const [triggerErr, triggerData] = await AWSWrapper.createS3LambdaTrigger(newBucketName, lambdaData.FunctionArn)
  if (triggerErr) {
    console.error(triggerErr)
  } else {
    console.log('success')
  }
  // console.log(triggerData)

  console.log('Uploading to S3...')
  const [uploadErr, uploadData] = await AWSWrapper.uploadToBucket(newBucketName, fileToUpload)
  if (uploadErr) {
    console.error(uploadErr)
  } else {
    console.log('success')
  }
  // console.log(uploadData)

  // // checks if AWS credentials are set
  // const [credentialsErr, credentials] = await AWSWrapper.getCredentials()
  // // console.log(credentialsErr)
  // console.log(credentials)

  // const [listLambdaErr, lamdas] = await AWSWrapper.listLambdas()
  // // console.log(listLambdaErr)
  // console.log(lamdas)
})()

module.exports = require('@oclif/command')
