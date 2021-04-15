const path = require('path');
const AWSWrapper = require('../aws');

const PATH_TO_LAMBDA_FUNCTION = path.resolve(`${__dirname}/../aws/lambda/_deployableLambdaFunction.js`);
const DATABASE_NAME = 'dendroflumechuck-timestream';
const DATABASE_TABLE = 'default-table';

function setupLambda( newRole ) {
  return new Promise( resolve => {
    console.log('Creating new lambda...');
      AWSWrapper.createLambda({
      lambdaFile: PATH_TO_LAMBDA_FUNCTION,
      Role: newRole.Role.Arn,
      DATABASE_NAME,
      DATABASE_TABLE,
    }).then( (lambdaData) => {
      AWSWrapper.setLambdaInvokePolicy(lambdaData.FunctionArn).then( () => resolve(lambdaData) );
    });
  });
}

module.exports = setupLambda;
