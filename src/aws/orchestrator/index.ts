import createRole from './createRole';
import createBucket from './createBucket';
import setupTimestream from './setupTimestream';
import query from './query';
import listTables from './listTables';
import getLogs from './getLogs';
import setupLambda from './setupLambda';
import setupFirehose from './setupFirehose';

export default {
  createRole,
  createBucket,
  setupTimestream,
  query,
  listTables,
  getLogs,
  setupLambda,
  setupFirehose,
};
