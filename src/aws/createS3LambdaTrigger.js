/* eslint-disable unicorn/filename-case */

const AWS = require('aws-sdk')

const s3 = new AWS.S3()

function createS3LambdaTrigger(Bucket, LambdaFunctionArn, callback) {
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
  }

  s3.putBucketNotificationConfiguration(params, callback)
}

module.exports = createS3LambdaTrigger
