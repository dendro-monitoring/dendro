import { AWSError } from 'aws-sdk';
import { AWS_LAMBDA, AWS_LAMBDA_FUNCTION_NAME } from '../../constants';

export default function listFunctions(): Promise<any> {
  return new Promise(resolve => {
    AWS_LAMBDA.listFunctions({}, (err: AWSError, data) => {
      if (err) throw new Error(err as unknown as string);
      else resolve(data.Functions?.filter(func => func.FunctionName === AWS_LAMBDA_FUNCTION_NAME));
    });
  });
}
