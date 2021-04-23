import * as path from 'path';
import AWSWrapper from '..';
import store from '../../store';
import { AWS_TIMESTREAM_DATABASE_NAME, AWS_S3_BUCKET_NAME } from '../../constants';
import getBucketName from './getBucketName';

const PATH_TO_LAMBDA_FUNCTION = path.resolve(`${__dirname}/../lambda/_deployableLambdaFunction.js`);

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
            path.basename(PATH_TO_LAMBDA_FUNCTION) === `${func.FunctionName}.js`
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

