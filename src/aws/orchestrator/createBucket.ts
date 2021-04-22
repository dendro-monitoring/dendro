
import AWSWrapper from '..';
import { AWS_S3_BUCKET_NAME } from '../../constants';

export default function createBucket(): Promise<void> {
  return AWSWrapper.createBucket(AWS_S3_BUCKET_NAME);
}

export function putS3Lifecycle(): Promise<void> {
  return AWSWrapper.putS3Lifecycle();
}
