import * as AWS from 'aws-sdk';
import { AWSError } from 'aws-sdk';
import { AWS_S3_BUCKET_NAME } from '../../constants';
import getBucketName from '../orchestrator/getBucketName';

const s3 = new AWS.S3();

export default function putLifecycle(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const params = {
      Bucket: await getBucketName() || AWS_S3_BUCKET_NAME,
      LifecycleConfiguration: {
        Rules: [
          {
            Expiration: {
              Days: 2
            },
            NoncurrentVersionExpiration: {
              NoncurrentDays: 2
            },
            Status: "Enabled",
            ID: 'DendroDeleteDuplicateData',
            Prefix: 'DendroDataDeletionPolicy'
          }
        ]
      }
    };

    s3.putBucketLifecycleConfiguration(params, (err: AWSError, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
}
