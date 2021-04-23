import { AWSError } from 'aws-sdk';
import { AWS_S3 } from '../../constants';

export default function createBucket(bucketName: string): Promise<any> {
  return new Promise(resolve => {
    const bucketParams = {
      Bucket: bucketName,
    };

    AWS_S3.createBucket(bucketParams, (err: AWSError, data) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}

