const AWS = require('aws-sdk');

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

function deleteBucket(Bucket, region = 'us-east-1') {
  return new Promise(resolve => {
    AWS.config.update({ region });

    const bucketParams = {
      Bucket,
    };

    s3.deleteBucket(bucketParams, (err, data) => {
      if (err) throw new Error(err);
      else resolve(data);
    });
  });
}

module.exports = deleteBucket;
