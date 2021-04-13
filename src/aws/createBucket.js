const AWS = require('aws-sdk')

const s3 = new AWS.S3()

function createBucket(bucketName, callback, region = "us-east-1") {
  AWS.config.update({region});
  
  var bucketParams = {
    Bucket : bucketName
  };
  
  s3.createBucket(bucketParams, callback);
}

module.exports = createBucket;

