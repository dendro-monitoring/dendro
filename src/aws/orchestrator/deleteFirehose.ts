import AWSWrapper from '../../aws';
import store from '../../store';
import { AWS_FIREHOSE_STREAM_NAME, AWS_S3_BUCKET_NAME } from '../../constants';

export default async function deleteFirehose(): Promise<any> {
  await AWSWrapper.deleteDeliveryStream();
}

