import * as AWS from 'aws-sdk';
import { AWSError } from 'aws-sdk';
import { AWS_LAMBDA_FUNCTION_NAME } from '../../constants';

const lambda = new AWS.Lambda();

export default function deleteLambdaFunction(): Promise<any> {
  return new Promise(resolve => {
    const params = {
      FunctionName: AWS_LAMBDA_FUNCTION_NAME, /* required */
    };
    lambda.deleteFunction(params, (err: AWSError) => {
      if (err && err.code === "ResourceNotFoundException") {
        resolve(err);
      } else if (err) {
        throw new Error(String(err)); // an error occurred
      } else resolve(null);     // successful response
    });
  });
}

