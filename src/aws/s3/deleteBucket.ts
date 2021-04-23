import { AWSError } from 'aws-sdk';
import { AWS_S3 } from '../../constants';

export default function deleteBucket(Bucket: string): Promise<any> {
  return new Promise(resolve => {
    const bucketParams = {
      Bucket,
    };

    AWS_S3.deleteBucket(bucketParams, (err: AWSError) => {
      if (err && err.code === "NoSuchBucket") {
        resolve(err);
      } else if (err) {
        throw new Error(String(err));
      } else resolve(null);
    });
  });
}
