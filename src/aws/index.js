const createBucket = require('./s3/createBucket')
const deleteBucket = require('./s3/deleteBucket')
const createLambda = require('./lambda/createLambda')
const listLambdas = require('./lambda/listLambdas')
const setLambdaInvokePolicy = require('./lambda/setLambdaInvokePolicy')
const createS3LambdaTrigger = require('./s3/createS3LambdaTrigger')
const uploadToBucket = require('./s3/uploadToBucket')
const getCredentials = require('./getCredentials')
const createTimestreamDatabase = require('./timestream/createTimestreamDatabase')
const createTimestreamTable = require('./timestream/createTimestreamTable')

module.exports = {
  createBucket,
  deleteBucket,
  createLambda,
  listLambdas,
  setLambdaInvokePolicy,
  createS3LambdaTrigger,
  uploadToBucket,
  getCredentials,
  createTimestreamDatabase,
  createTimestreamTable,
}
