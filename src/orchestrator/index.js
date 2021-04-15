const createRole = require('./createRole');
const createBucket = require('./createBucket');
const setupTimestream = require('./setupTimestream');
const setupLambda = require('./setupLambda');
const setupFirehose = require('./setupFirehose');
const linkBucketToLambda = require('./linkBucketToLambda');

module.exports = {
  createRole,
  createBucket,
  setupTimestream,
  setupLambda,
  setupFirehose, 
  linkBucketToLambda
};
