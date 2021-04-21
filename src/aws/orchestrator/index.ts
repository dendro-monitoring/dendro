import createRole from './createRole';
import createBucket from './createBucket';
import setupTimestream from './setupTimestream';
import query from './query';
import listTables from './listTables';
import getLogEvents from './getLogEvents';
import setupLambda from './setupLambda';
import setupFirehose from './setupFirehose';
import detachRolePolicies from './detachRolePolicies';
import deleteRole from './deleteRole';
import deleteBucket from './deleteBucket';
import deleteFirehose from './deleteFirehose';

export default {
  createRole,
  createBucket,
  setupTimestream,
  query,
  listTables,
  getLogEvents,
  setupLambda,
  setupFirehose,
  detachRolePolicies,
  deleteRole,
  deleteBucket,
  deleteFirehose,
};
