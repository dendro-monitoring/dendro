import listBuckets from '../s3/listBuckets';
import { AWS_S3_BUCKET_PREFIX } from '../../constants';

export default function getBucketName(): Promise<string | void> {
  return new Promise(async (resolve) => {
    const buckets = await listBuckets();
    for (const bucket of buckets.Buckets) {
      if (bucket.Name.substring(0, AWS_S3_BUCKET_PREFIX.length) === AWS_S3_BUCKET_PREFIX) return resolve(bucket.Name);
    }
    resolve();
  });
}
