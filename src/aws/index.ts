import createBucket from './s3/createBucket';
import listBuckets from './s3/listBuckets';
import deleteBucket from './s3/deleteBucket';
import createS3LambdaTrigger from './s3/createS3LambdaTrigger';

import createLambda from './lambda/createLambda';
import listFunctions from './lambda/listFunctions';
import setLambdaInvokePolicy from './lambda/setLambdaInvokePolicy';

import uploadToBucket from './s3/uploadToBucket';

import createTimestreamDatabase from './timestream/createTimestreamDatabase';
import createTimestreamTable from './timestream/createTimestreamTable';
import query from './timestream/query';
import listDatabases from './timestream/listDatabases';
import listTables from './timestream/listTables';

import createDeliveryStream from './firehose/createDeliveryStream';
import listDeliveryStreams from './firehose/listDeliveryStreams';
import deleteDeliveryStream from './firehose/deleteDeliveryStream';

import createRole from './iam/createRole';
import attachRolePolicy from './iam/attachRolePolicy';
import listRoles from './iam/listRoles';
import detachRolePolicy from './iam/detachRolePolicy';

import getCredentials from './getCredentials';

import describeLogStreams from './cloudwatch/describeLogStreams';
import getLogEvents from './cloudwatch/getLogEvents';

export default {
  createBucket,
  listBuckets,
  deleteBucket,
  createS3LambdaTrigger,

  createLambda,
  listFunctions,
  setLambdaInvokePolicy,

  uploadToBucket,

  createTimestreamDatabase,
  createTimestreamTable,
  query,
  listDatabases,
  listTables,

  createDeliveryStream,
  listDeliveryStreams,
  deleteDeliveryStream,

  createRole,
  attachRolePolicy,
  listRoles,
  detachRolePolicy,

  getCredentials,

  describeLogStreams,
  getLogEvents
};
