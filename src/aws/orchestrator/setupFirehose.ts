import AWSWrapper from '../../aws';
import store from '../../store';

export default async function setupFirehose(): Promise<any> {
  // TODO don't do this
  await new Promise(r => setTimeout(r, 10000));
  return AWSWrapper.createDeliveryStream(store.AWS.Firehose.deliveryStreamName!, store.AWS.S3.bucketName!, store.AWS.IAM.Arn!);

}

