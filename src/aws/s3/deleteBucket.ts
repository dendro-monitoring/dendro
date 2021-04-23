import { AWSError } from 'aws-sdk';
import { s3 } from '../singletons';

export default function deleteBucket(Bucket: string): Promise<any> {
  return new Promise(resolve => {
    const bucketParams = {
      Bucket,
    };

    s3.deleteBucket(bucketParams, (err: AWSError, data) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}
