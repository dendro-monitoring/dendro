import { AWS_S3_BUCKET_NAME } from '../../constants';
import AWSWrapper from '..';
import getBucketName from './getBucketName';

export default function createBucket(): Promise<void> {
  return new Promise<void>(async (resolve) => {
    if (await getBucketName()) return resolve();

    AWSWrapper.createBucket(AWS_S3_BUCKET_NAME)
      .then(async () => {
        await AWSWrapper.putS3Lifecycle();
        resolve();
      });
  });
}
