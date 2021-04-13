const createBucket = require('./createBucket')
const deleteBucket = require('./deleteBucket')
const createLambda = require('./createLambda')
const listLambdas = require('./listLambdas')
const setLambdaInvokePolicy = require('./setLambdaInvokePolicy')
const createS3LambdaTrigger = require('./createS3LambdaTrigger')
const uploadToBucket = require('./uploadToBucket')
const getCredentials = require('./getCredentials')
const createTimestreamDatabase = require('./createTimestreamDatabase')
const createTimestreamTable = require('./createTimestreamTable')

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
