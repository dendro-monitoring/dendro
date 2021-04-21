import * as AWS from 'aws-sdk';
import { AWSError } from 'aws-sdk';
import { AWS_REGION } from '../../constants';

export default function setLambdaInvokePolicy(
  Arn: string,
  StatementId = 'example-S3-permission',
  region = AWS_REGION,
): Promise<any> {
  return new Promise(resolve => {
    AWS.config.update({ region });

    // Creates Lambda Function Policy which must be created once for each Lambda function
    // Must be done before calling s3.putBucketNotificationConfiguration(...)
    const lambda = new AWS.Lambda();

    const params = {
      Action: 'lambda:InvokeFunction',
      FunctionName: Arn,
      Principal: 's3.amazonaws.com',
      StatementId,
    };

    lambda.addPermission(params, (err: AWSError, data) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}
