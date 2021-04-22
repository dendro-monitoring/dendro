import createRole from './createRole';
import createBucket from './createBucket';
import setupTimestream from './setupTimestream';
import deleteTimestream from './deleteTimestream';
import query from './query';
import listTables from './listTables';
import getLogEvents from './getLogEvents';
import setupLambda from './setupLambda';
import setupFirehose from './setupFirehose';

export default {
  createRole,
  createBucket,
  setupTimestream,
  deleteTimestream,
  query,
  listTables,
  getLogEvents,
  setupLambda,
  setupFirehose,
};
