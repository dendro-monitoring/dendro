import createBucket from './s3/createBucket';
import deleteBucket from './s3/deleteBucket';
import createS3LambdaTrigger from './s3/createS3LambdaTrigger';

import createLambda from './lambda/createLambda';
import listLambdas from './lambda/listLambdas';
import setLambdaInvokePolicy from './lambda/setLambdaInvokePolicy';

import uploadToBucket from './s3/uploadToBucket';

import createTimestreamDatabase from './timestream/createTimestreamDatabase';
import createTimestreamTable from './timestream/createTimestreamTable';
import query from './timestream/query';

import createDeliveryStream from './firehose/createDeliveryStream';

import createRole from './iam/createRole';
import attachRolePolicy from './iam/attachRolePolicy';

import getCredentials from './getCredentials';

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
  query,

  createDeliveryStream,

  createRole,
  attachRolePolicy,

  getCredentials,
};
