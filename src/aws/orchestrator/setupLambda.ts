/* eslint-disable max-lines-per-function */
import * as path from 'path';
import AWSWrapper from '..';
import store from '../../store';
import { AWS_TIMESTREAM_DATABASE_NAME, AWS_S3_BUCKET_NAME, AWS_LAMBDA_FUNCTION_NAME } from '../../constants';
import getBucketName from './getBucketName';

const PATH_TO_LAMBDA_FUNCTION = path.resolve(`${__dirname}/../lambda/go/function.zip`);

export default function setupLambda(): Promise<void> {
  return new Promise( resolve => {
    const params: any = {
      lambdaFile: PATH_TO_LAMBDA_FUNCTION,
      Role: store.AWS.IAM.Arn,
      DATABASE_NAME: AWS_TIMESTREAM_DATABASE_NAME,
    };

    AWSWrapper.createLambda(params).then(async (lambdaData) => {
      if (!lambdaData) {
        const funcs = await AWSWrapper.listFunctions();
        store.AWS.Lambda.FunctionArn = funcs
          .Functions
          .find((func: { FunctionName: string}) => (
            AWS_LAMBDA_FUNCTION_NAME === func.FunctionName
          )).FunctionArn;

        return resolve();
      }

      AWSWrapper.setLambdaInvokePolicy(lambdaData.FunctionArn)
        .then(async () => {
          store.AWS.Lambda.FunctionArn = lambdaData.FunctionArn;
          await AWSWrapper.createS3LambdaTrigger(
            await getBucketName() || AWS_S3_BUCKET_NAME,
            store.AWS.Lambda.FunctionArn as string
          );

          resolve();
        });
    });
  });
}

