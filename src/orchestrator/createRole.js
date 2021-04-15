// const globalState = require('../globalState')
const AWSWrapper = require('../aws');
const globalState = require('../globalState');

const LAMBDA_POLICY_ARN = 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole';
const FIREHOSE_POLICY_ARN = 'arn:aws:iam::aws:policy/AmazonKinesisFirehoseFullAccess';
const TIMESTREAM_POLICY_ARN = 'arn:aws:iam::aws:policy/AmazonTimestreamFullAccess';
const S3_POLICY_ARN = 'arn:aws:iam::aws:policy/AmazonS3FullAccess';

function createRole() {
  return new Promise(resolve => {
    const promises = [];

    AWSWrapper.createRole(globalState.default.AWS.IAM.Role.RoleName, ['firehose.amazonaws.com', 'lambda.amazonaws.com']).then(newRole => {

      promises.push(AWSWrapper.attachRolePolicy(globalState.default.AWS.IAM.Role.RoleName, FIREHOSE_POLICY_ARN));
      promises.push(AWSWrapper.attachRolePolicy(globalState.default.AWS.IAM.Role.RoleName, LAMBDA_POLICY_ARN));
      promises.push(AWSWrapper.attachRolePolicy(globalState.default.AWS.IAM.Role.RoleName, TIMESTREAM_POLICY_ARN));
      promises.push(AWSWrapper.attachRolePolicy(globalState.default.AWS.IAM.Role.RoleName, S3_POLICY_ARN));

      // globalState.AWS.IAM.Role = newRole

      Promise.all(promises).then(() => {
        globalState.default.AWS.IAM.Role = newRole;
        resolve(newRole);
      });
    });
  });
}

module.exports = createRole;
