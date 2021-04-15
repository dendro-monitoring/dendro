// const globalState = require('../globalState')
const AWSWrapper = require('../aws');

const NEW_ROLE_NAME = 'dendroflumechuck-role';

const LAMBDA_POLICY_ARN = 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole';
const FIREHOSE_POLICY_ARN = 'arn:aws:iam::aws:policy/AmazonKinesisFirehoseFullAccess';
const TIMESTREAM_POLICY_ARN = 'arn:aws:iam::aws:policy/AmazonTimestreamFullAccess';
const S3_POLICY_ARN = 'arn:aws:iam::aws:policy/AmazonS3FullAccess';

function createRole() {
  return new Promise(resolve => {
    const promises = [];

    console.log('Creating new role for dendroflumechuck pipeline...');

    AWSWrapper.createRole(NEW_ROLE_NAME, ['firehose.amazonaws.com', 'lambda.amazonaws.com']).then(newRole => {
      promises.push(AWSWrapper.attachRolePolicy(NEW_ROLE_NAME, FIREHOSE_POLICY_ARN));
      promises.push(AWSWrapper.attachRolePolicy(NEW_ROLE_NAME, LAMBDA_POLICY_ARN));
      promises.push(AWSWrapper.attachRolePolicy(NEW_ROLE_NAME, TIMESTREAM_POLICY_ARN));
      promises.push(AWSWrapper.attachRolePolicy(NEW_ROLE_NAME, S3_POLICY_ARN));

      // globalState.AWS.IAM.Role = newRole

      Promise.all(promises).then(() => {
        resolve(newRole);
      });
    });
  });
}

module.exports = createRole;
