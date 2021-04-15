
const globalState = require('../globalState');
const AWSWrapper = require('../aws');

function createBucket() {
  return new Promise(resolve => {
    AWSWrapper.createBucket(globalState.default.AWS.s3.bucketName).then(() => {
      resolve();
    });
  });
}

module.exports = createBucket;