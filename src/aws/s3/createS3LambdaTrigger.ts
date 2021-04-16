/*
 * WARNING: This overwrites previous triggers. As of right now, each bucket can only
 * trigger one lambda
*/

import AWS = require('aws-sdk');
import { AWSError } from 'aws-sdk';
<<<<<<< HEAD:src/aws/s3/createS3LambdaTrigger.ts

=======
>>>>>>> 0becc9cc1b4db997d07357e1fb3c471766f7922a:src/aws/s3/createS3LambdaTrigger.js

const s3 = new AWS.S3();

export default function createS3LambdaTrigger(Bucket: string, LambdaFunctionArn: string): Promise<any> {
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

    s3.putBucketNotificationConfiguration(params, (err: AWSError, data) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}
