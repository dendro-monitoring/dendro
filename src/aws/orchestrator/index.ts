import createRole from './createRole';
import createBucket from './createBucket';
import setupTimestream from './setupTimestream';
import deleteTimestream from './deleteTimestream';
import query from './query';
import listTables from './listTables';
import getLogs from './getLogs';
import setupLambda from './setupLambda';
import setupFirehose from './setupFirehose';
import detachRolePolicies from './detachRolePolicies';
import deleteRole from './deleteRole';
import deleteBucket from './deleteBucket';
import deleteFirehose from './deleteFirehose';
import deleteLambda from './deleteLambda';
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
