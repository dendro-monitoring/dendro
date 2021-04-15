/*
 * WARNING: This overwrites previous triggers. As of right now, each bucket can only
 * trigger one lambda
*/

const AWS = require('aws-sdk');

const s3 = new AWS.S3();

function createS3LambdaTrigger(Bucket, LambdaFunctionArn) {
  return new Promise(resolve => {
    const params = {
      Bucket,
      NotificationConfiguration: {
        LambdaFunctionConfigurations: [
          {
            Id: `lambda-upload-notification-${process.argv[2]}`,
            LambdaFunctionArn,
            Events: ['s3:ObjectCreated:*'],
          },
        ],
      },
    };

    s3.putBucketNotificationConfiguration(params, (err, data) => {
      resolve([err, data]);
    });
  });
}

module.exports = createS3LambdaTrigger;
