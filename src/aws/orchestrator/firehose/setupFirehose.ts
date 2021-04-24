import AWSWrapper from '../..';
import store from '../../../store';
import { AWS_FIREHOSE_STREAM_NAME, AWS_S3_BUCKET_NAME } from '../../../constants';
import getBucketName from '../s3/getBucketName';

export default async function setupFirehose(): Promise<any> {
  // TODO don't do this
  await new Promise(r => setTimeout(r, 12500));
  return AWSWrapper.createDeliveryStream(
    AWS_FIREHOSE_STREAM_NAME,
    await getBucketName() || AWS_S3_BUCKET_NAME,
    store.AWS.IAM.Arn!
  );
}
