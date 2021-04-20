import AWSWrapper from '../../aws';
import store from '../../store';

export default async function setupFirehose(): Promise<any> {

  return AWSWrapper.createDeliveryStream(
    store.AWS.Firehose.deliveryStreamName,
    store.AWS.S3.bucketName,
    store.AWS.IAM.Arn!);

}

