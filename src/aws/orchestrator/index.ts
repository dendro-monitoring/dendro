import createRole from './iam/createRole';
import createBucket from './s3/createBucket';
import setupTimestream from './timestream/setupTimestream';
import deleteTimestream from './timestream/deleteTimestream';
import query from './timestream/query';
import listTables from './timestream/listTables';
import getLogs from './cloudwatch/getLogs';
import setupLambda from './lambda/setupLambda';
import setupFirehose from './firehose/setupFirehose';
import detachRolePolicies from './iam/detachRolePolicies';
import deleteRole from './iam/deleteRole';
import deleteBucket from './s3/deleteBucket';
import deleteFirehose from './firehose/deleteFirehose';
import deleteLambda from './lambda/deleteLambda';
import getItemsToDelete from './getItemsToDelete';

export default {
  createRole,
  createBucket,
  setupTimestream,
  deleteTimestream,
  query,
  listTables,
  getLogs,
  setupLambda,
  setupFirehose,
  detachRolePolicies,
  deleteRole,
  deleteBucket,
  deleteFirehose,
  deleteLambda,
  getItemsToDelete,
};
