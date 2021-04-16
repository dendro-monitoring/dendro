import path = require('path');
import AWSWrapper from '..';

const PATH_TO_LAMBDA_FUNCTION = path.resolve(`${__dirname}/../aws/lambda/_deployableLambdaFunction.js`);
const DATABASE_NAME = 'dendroflumechuck-timestream';
const DATABASE_TABLE = 'default-table';

export default function setupLambda( newRole: { Role: { Arn: string }} ): Promise<any> {
  return new Promise( resolve => {
    AWSWrapper.createLambda({
      lambdaFile: PATH_TO_LAMBDA_FUNCTION,
      Role: newRole.Role.Arn,
      DATABASE_NAME,
      DATABASE_TABLE,
    } as any).then( (lambdaData) => {
      AWSWrapper.setLambdaInvokePolicy(lambdaData.FunctionArn).then( () => resolve(lambdaData) );
    });
  });
}

