/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const AWSWrapper = require('./aws')

const newRoleName = 'dendro-lambda-role'
const newBucketName = 'dendrodefaultbucket'
const pathToLambdaFunc = './aws/_deployableLambdaFunction.js'
const fileToUpload = './aws/uploadToBucket.js';

(async () => {
  console.log('Creating new lambda role...')
  const [lambdaRoleErr, lambdaRole] = await AWSWrapper.createLambdaRole(newRoleName)
  // console.log(lambdaRoleErr)
  // console.log(lambdaRole)

  console.log('Attaching AWSLambdaBasicExecutionRole...')
  const [attachPolicyErr, attachPolicyData] = await AWSWrapper.attachLambdaBasicExecutionPolicy(newRoleName)
  // console.log(attachPolicyErr)
  // console.log(attachPolicyData)

  console.log('Creating new bucket...')
  const [bucketErr, bucketData] = await AWSWrapper.createBucket(newBucketName)
  // console.log(bucketErr)
  // console.log(bucketData)

  console.log('Creating new lambda...')
  const [lambdaErr, lambdaData] = await AWSWrapper.createLambda(pathToLambdaFunc, lambdaRole.Role.Arn)
  // console.log(lambdaErr)
  // console.log(lambdaData)

  console.log('Setting lambda invoke policy...')
  const [policyErr, policyData] = await AWSWrapper.setLambdaInvokePolicy(lambdaData.FunctionArn)
  // console.log(policyErr)
  // console.log(policyData)

  console.log('Creating S3 trigger...')
  const [triggerErr, triggerData] = await AWSWrapper.createS3LambdaTrigger(newBucketName, lambdaData.FunctionArn)
  // console.log(triggerErr)
  // console.log(triggerData)

  console.log('Uploading to S3...')
  const [uploadErr, uploadData] = await AWSWrapper.uploadToBucket(newBucketName, fileToUpload)
  console.log(uploadErr)
  console.log(uploadData)

  // const [credentialsErr, credentials] = await AWSWrapper.getCredentials()
  // // console.log(credentialsErr)
  // console.log(credentials)

  // const [listLambdaErr, lamdas] = await AWSWrapper.listLambdas()
  // // console.log(listLambdaErr)
  // console.log(lamdas)
})()

module.exports = require('@oclif/command')

