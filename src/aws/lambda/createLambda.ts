/* eslint-disable max-lines-per-function */
import * as fs from 'fs';
import { AWSError } from 'aws-sdk';

import store from '../../store';
import { AWS_LAMBDA, AWS_LAMBDA_FUNCTION_NAME } from '../../constants';

interface LambdaData {
  lambdaFile: string,
  Role: string,
  DATABASE_NAME: string,
  Runtime: string,
  region: string,
  Description: string
}

export default function createLambda({
  lambdaFile,
  Role = store.AWS.IAM.Arn!,
  DATABASE_NAME,
  Runtime = 'go1.x',
  Description = '',
}: LambdaData): Promise<any> {
  return new Promise(resolve => {
    if (!fs.existsSync(lambdaFile)) {
      throw new Error('Can\'t find lambda file');
    }

    const params = {
      Code: {
        ZipFile: fs.readFileSync(lambdaFile),
      },
      FunctionName: AWS_LAMBDA_FUNCTION_NAME,
      Handler: 'main',
      Role,
      Runtime,
      Description,
      Timeout: 180,
      Environment: {
        Variables: {
          DATABASE_NAME,
        },
      },
    };

    AWS_LAMBDA.createFunction(params, (err: AWSError, data) => {
      if (err && err.code !== 'ResourceConflictException' && err.code !== 'ResourceInUseException') throw new Error(String(err));
      else resolve(data);
    });
  });
}

