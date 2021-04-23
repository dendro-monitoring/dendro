import { AWSError } from 'aws-sdk';
import { AWS_LAMBDA } from '../../constants';

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

    AWS_LAMBDA.addPermission(params, (err: AWSError, data) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}
