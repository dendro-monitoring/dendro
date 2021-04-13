var AWS = require('aws-sdk');

function deleteBucket(Bucket, region = 'us-east-1') {
  AWS.config.update({region});
  
  s3 = new AWS.S3({apiVersion: '2006-03-01'});
  
  var bucketParams = {
    Bucket
  };
  
  s3.deleteBucket(bucketParams, callback);
}

module.exports = deleteBucket;
