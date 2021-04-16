import createRole from './createRole';
import createBucket from './createBucket';
import setupTimestream from './setupTimestream';
import setupLambda from './setupLambda';
import setupFirehose from './setupFirehose';
import linkBucketToLambda from './linkBucketToLambda';

export default {
  createRole,
  createBucket,
  setupTimestream,
  setupLambda,
  setupFirehose, 
  linkBucketToLambda
};
