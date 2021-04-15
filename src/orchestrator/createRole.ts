// const store = require('../store')
import AWSWrapper from '../aws';
import store from '../store';

const LAMBDA_POLICY_ARN = 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole';
const FIREHOSE_POLICY_ARN = 'arn:aws:iam::aws:policy/AmazonKinesisFirehoseFullAccess';
const TIMESTREAM_POLICY_ARN = 'arn:aws:iam::aws:policy/AmazonTimestreamFullAccess';
const S3_POLICY_ARN = 'arn:aws:iam::aws:policy/AmazonS3FullAccess';

export default function createRole(): Promise<any> {
  return new Promise(resolve => {
    const promises: Promise<any>[] = [];

    AWSWrapper.createRole(store.AWS.IAM.Role.RoleName, ['firehose.amazonaws.com', 'lambda.amazonaws.com']).then(newRole => {

      promises.push(AWSWrapper.attachRolePolicy(store.AWS.IAM.Role.RoleName, FIREHOSE_POLICY_ARN));
      promises.push(AWSWrapper.attachRolePolicy(store.AWS.IAM.Role.RoleName, LAMBDA_POLICY_ARN));
      promises.push(AWSWrapper.attachRolePolicy(store.AWS.IAM.Role.RoleName, TIMESTREAM_POLICY_ARN));
      promises.push(AWSWrapper.attachRolePolicy(store.AWS.IAM.Role.RoleName, S3_POLICY_ARN));

      // store.IAM.Role = newRole

      Promise.all(promises).then(() => {
        store.AWS.IAM.Role = newRole;
        resolve(newRole);
      });
    });
  });
}