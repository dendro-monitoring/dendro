const AWS = require('aws-sdk');

const s3 = new AWS.S3();

function createBucket(bucketName, region = 'us-east-1') {
  return new Promise(resolve => {
    AWS.config.update({ region });

    const bucketParams = {
      Bucket: bucketName,
    };

    s3.createBucket(bucketParams, (err, data) => {
      resolve([err, data]);
    });
  });
}

module.exports = createBucket;

