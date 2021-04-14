const createBucket = require('./s3/createBucket')
const deleteBucket = require('./s3/deleteBucket')
const createLambda = require('./lambda/createLambda')
const createLambdaRole = require('./lambda/createLambdaRole')
const listLambdas = require('./lambda/listLambdas')
const setLambdaInvokePolicy = require('./lambda/setLambdaInvokePolicy')
const attachLambdaBasicExecutionPolicy = require('./lambda/attachLambdaBasicExecutionPolicy')
const createS3LambdaTrigger = require('./s3/createS3LambdaTrigger')
const uploadToBucket = require('./s3/uploadToBucket')
const getCredentials = require('./getCredentials')
const createTimestreamDatabase = require('./timestream/createTimestreamDatabase')
const createTimestreamTable = require('./timestream/createTimestreamTable')

module.exports = {
  createBucket,
  deleteBucket,
  createLambda,
  createLambdaRole,
  listLambdas,
  setLambdaInvokePolicy,
  attachLambdaBasicExecutionPolicy,
  createS3LambdaTrigger,
  uploadToBucket,
  getCredentials,
  createTimestreamDatabase,
  createTimestreamTable,
}
