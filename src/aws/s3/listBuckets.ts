import { AWSError } from 'aws-sdk';
import { AWS_S3, AWS_S3_BUCKET_PREFIX } from '../../constants';

export default function listBuckets(): Promise<any>{
  return new Promise(resolve => {
    AWS_S3.listBuckets((err: AWSError, data) => {
      if (err) throw new Error(String(err));
      else resolve(data.Buckets?.filter( ({ Name }) => Name?.includes(AWS_S3_BUCKET_PREFIX)));
    });
  });
}

