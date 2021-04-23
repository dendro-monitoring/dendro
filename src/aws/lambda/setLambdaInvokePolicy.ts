import { AWSError } from 'aws-sdk';
import { lambda } from '../singletons';

export default function setLambdaInvokePolicy(
  Arn: string,
  StatementId = 'example-S3-permission',
): Promise<any> {
  return new Promise(resolve => {

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
