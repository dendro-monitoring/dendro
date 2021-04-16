import AWSWrapper from '../aws';
import store from '../store';

export default function linkBucketToLambda(): Promise<any> {
  return new Promise(resolve => {
    AWSWrapper.createS3LambdaTrigger(store.AWS.S3.bucketName, store.AWS.Lambda.FunctionArn).then((triggerData) => {
      resolve(triggerData);
    });
  });
}
