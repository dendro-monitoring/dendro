const createBucket = require('./s3/createBucket');
const deleteBucket = require('./s3/deleteBucket');
const createS3LambdaTrigger = require('./s3/createS3LambdaTrigger');

const createLambda = require('./lambda/createLambda');
const listLambdas = require('./lambda/listLambdas');
const setLambdaInvokePolicy = require('./lambda/setLambdaInvokePolicy');

const uploadToBucket = require('./s3/uploadToBucket');

const createTimestreamDatabase = require('./timestream/createTimestreamDatabase');
const createTimestreamTable = require('./timestream/createTimestreamTable');

const createDeliveryStream = require('./firehose/createDeliveryStream');

const createRole = require('./iam/createRole');
const attachRolePolicy = require('./iam/attachRolePolicy');

const getCredentials = require('./getCredentials');

export default {
  createBucket,
  deleteBucket,
  createS3LambdaTrigger,

  createLambda,
  listLambdas,
  setLambdaInvokePolicy,

  uploadToBucket,

  createTimestreamDatabase,
  createTimestreamTable,

  createDeliveryStream,

  createRole,
  attachRolePolicy,

  getCredentials,
};
