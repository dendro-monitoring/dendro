const AWSWrapper = require('../aws');

function linkBucketToLambda(bucketName, lambdaData) {
  return new Promise(resolve => {
      AWSWrapper.createS3LambdaTrigger(bucketName, lambdaData.FunctionArn).then(() => {
        resolve();
      });
  });
}

module.exports = linkBucketToLambda;