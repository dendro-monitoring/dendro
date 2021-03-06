/*
 * WARNING: This overwrites previous triggers. As of right now, each bucket can only
 * trigger one lambda
*/

import { AWSError } from 'aws-sdk';
import { AWS_S3 } from '../../constants';

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

    AWS_S3.putBucketNotificationConfiguration(params, (err: AWSError, data) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}
