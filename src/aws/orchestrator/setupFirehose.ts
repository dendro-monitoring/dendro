import AWSWrapper from '../../aws';
import store from '../../store';
import { AWS_FIREHOSE_STREAM_NAME, AWS_S3_BUCKET_NAME } from '../../constants';
import getBucketName from './getBucketName';

export default async function setupFirehose(): Promise<any> {
  // TODO don't do this
  await new Promise(r => setTimeout(r, 10000));
  return AWSWrapper.createDeliveryStream(
    AWS_FIREHOSE_STREAM_NAME,
    await getBucketName() || AWS_S3_BUCKET_NAME,
    store.AWS.IAM.Arn!
  );
}

