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

export default {
  createRole,
  createBucket,
  setupTimestream,
  query,
  listTables,
  getLogEvents,
  setupLambda,
  setupFirehose,
<<<<<<< HEAD
  detachRolePolicies,
  deleteRole,
  deleteBucket,
=======
>>>>>>> 6717b17772b50897f482603a497b7c6e2d9b7cf0
};
