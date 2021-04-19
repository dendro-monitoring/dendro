import createRole from './createRole';
import createBucket from './createBucket';
import setupTimestream from './setupTimestream';
import query from './query';
import getLogEvents from './getLogEvents';
import setupLambda from './setupLambda';
import setupFirehose from './setupFirehose';

export default {
  createRole,
  createBucket,
  setupTimestream,
  query,
  getLogEvents,
  setupLambda,
  setupFirehose, 
};
