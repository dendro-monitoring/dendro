import AWSWrapper from '..';

export default function linkBucketToLambda(bucketName: string, lambdaData: { FunctionArn: string}): Promise<any> {
  return new Promise(resolve => {
    AWSWrapper.createS3LambdaTrigger(bucketName, lambdaData.FunctionArn).then((triggerData) => {
      resolve(triggerData);
    });
  });
}
