import AWS = require('aws-sdk');
import { AWSError } from 'aws-sdk';

import store from '../../store';

export default function setLambdaInvokePolicy(
  Arn: string,
  StatementId = 'example-S3-permission',
): Promise<any> {
  return new Promise(resolve => {
    AWS.config.update({ region: store.AWS.region });

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
