import createRole from './createRole';
import createBucket, { putS3Lifecycle } from './createBucket';
import setupTimestream from './setupTimestream';
import query from './query';
import listTables from './listTables';
import getLogEvents from './getLogEvents';
import setupLambda from './setupLambda';
import setupFirehose from './setupFirehose';

export default {
  createRole,
  createBucket,
  putS3Lifecycle,
  setupTimestream,
  query,
  listTables,
  getLogEvents,
  setupLambda,
  setupFirehose,
};
