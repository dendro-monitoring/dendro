import { AWSError } from 'aws-sdk';
import { AWS_S3, AWS_S3_BUCKET_NAME } from '../../constants';

export default function putLifecycle(): Promise<any> {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: AWS_S3_BUCKET_NAME,
      LifecycleConfiguration: {
        Rules: [
          {
            Expiration: {
              Days: 2
            },
            NoncurrentVersionExpiration: {
              NoncurrentDays: 2
            },
            Status: 'Enabled',
            ID: 'DendroDeleteDuplicateData',
            Prefix: 'DendroDataDeletionPolicy'
          }
        ]
      }
    };

    AWS_S3.putBucketLifecycleConfiguration(params, (err: AWSError, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
}
