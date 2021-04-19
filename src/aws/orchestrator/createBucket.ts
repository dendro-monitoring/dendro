
import store from '../../store';
import AWSWrapper from '..';

export default function createBucket(): Promise<void> {
  return AWSWrapper.createBucket(store.AWS.S3.bucketName!);
}

