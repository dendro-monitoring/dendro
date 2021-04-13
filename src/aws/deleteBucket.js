var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-east-1'});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Create params for S3.deleteBucket
var bucketParams = {
  Bucket : process.argv[2]
};

// Call S3 to delete the bucket
s3.deleteBucket(bucketParams, async function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
  console.log(await s3.listBuckets().promise());
});
