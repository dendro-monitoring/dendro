import { AWSError } from 'aws-sdk';
import { s3 } from '../singletons';

export default function createBucket(bucketName: string): Promise<any> {
  return new Promise(resolve => {
    const bucketParams = {
      Bucket: bucketName,
    };

    s3.createBucket(bucketParams, (err: AWSError, data) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}

