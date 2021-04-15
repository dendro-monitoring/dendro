const AWSWrapper = require('../aws');

const NEW_BUCKET_NAME = 'dendrodefaultbucket';

function createBucket() {
  return new Promise(resolve => {
      AWSWrapper.createBucket(NEW_BUCKET_NAME).then(() => {
        resolve();
      });
  });
}

module.exports = createBucket;