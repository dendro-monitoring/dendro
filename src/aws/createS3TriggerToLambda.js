const AWS = require('aws-sdk');

const s3 = new AWS.S3()

const bucketName = process.argv[2]
const ARN = process.argv[3] || "arn:aws:lambda:us-east-1:141351053848:function:createTimestreamDatabase"

var params = {
  Bucket: bucketName, 
  NotificationConfiguration: {
    LambdaFunctionConfigurations: [
    {
        Id: `lambda-upload-notification-${process.argv[2]}`,
        LambdaFunctionArn: ARN,
        Events: ['s3:ObjectCreated:*']
    }
   ]
  }
 };
 s3.putBucketNotificationConfiguration(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
 });
