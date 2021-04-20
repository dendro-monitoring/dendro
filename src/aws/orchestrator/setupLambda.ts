import path = require('path');
import AWSWrapper from '..';
import store from '../../store';

const PATH_TO_LAMBDA_FUNCTION = path.resolve(`${__dirname}/../lambda/_deployableLambdaFunction.js`);

export default function setupLambda(): Promise<void> {
  return new Promise( resolve => {
    AWSWrapper.createLambda({
      lambdaFile: PATH_TO_LAMBDA_FUNCTION,
      Role: store.AWS.IAM.Arn,
      DATABASE_NAME: store.AWS.Timestream.DatabaseName,
      DATABASE_TABLE_PREFIX: store.AWS.Timestream.TablePrefix,
    } as any).then( async (lambdaData) => {

      if (!lambdaData) {
        const funcs = await AWSWrapper.listFunctions();
        store.AWS.Lambda.FunctionArn = funcs.Functions.find( (func: { FunctionName: string}) => path.basename(PATH_TO_LAMBDA_FUNCTION) === `${func.FunctionName}.js`).FunctionArn;
        return resolve();
      } 
      AWSWrapper.setLambdaInvokePolicy(lambdaData.FunctionArn).then( async () => {
        store.AWS.Lambda.FunctionArn = lambdaData.FunctionArn;
        await AWSWrapper.createS3LambdaTrigger(store.AWS.S3.bucketName!, store.AWS.Lambda.FunctionArn!);
        resolve();
      });
    });
  });
}

