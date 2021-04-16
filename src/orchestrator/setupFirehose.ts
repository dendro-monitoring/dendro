import AWSWrapper from '../aws';
import store from '../store';

export default function setupFirehose(): Promise<any> {
  return new Promise(resolve => {
    // TODO don't do this
    new Promise(r => setTimeout(r, 10000)).then( () => {
      AWSWrapper.createDeliveryStream(store.AWS.Firehose.deliveryStreamName, store.AWS.S3.bucketName, store.AWS.IAM.Role.Arn).then((firehoseData) => {
        console.log(firehoseData);
        resolve();
      });
    });
  });
}

