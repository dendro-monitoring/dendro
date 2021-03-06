import { AWSError } from 'aws-sdk';
import { AWS_LAMBDA_FUNCTION_NAME, AWS_LAMBDA } from '../../constants';

export default function deleteFunction(): Promise<any> {
  return new Promise(resolve => {
    const params = {
      FunctionName: AWS_LAMBDA_FUNCTION_NAME, /* required */
    };
    AWS_LAMBDA.deleteFunction(params, (err: AWSError) => {
      if (err && err.code === 'ResourceNotFoundException') {
        resolve(err);
      } else if (err) {
        throw new Error(String(err)); // an error occurred
      } else resolve(null);     // successful response
    });
  });
}

