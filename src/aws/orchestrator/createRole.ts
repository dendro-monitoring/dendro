// const store = require('../store')
import AWSWrapper from '..';
import store from '../../store';
import constants from '../../constants';

export default function createRole(): Promise<any> {
  return new Promise(resolve => {
    const promises: Promise<any>[] = [];

    AWSWrapper.createRole(store.AWS.IAM.Role.RoleName, ['firehose.amazonaws.com', 'lambda.amazonaws.com']).then(newRole => {

      promises.push(AWSWrapper.attachRolePolicy(store.AWS.IAM.Role.RoleName, constants.FIREHOSE_POLICY_ARN));
      promises.push(AWSWrapper.attachRolePolicy(store.AWS.IAM.Role.RoleName, constants.LAMBDA_POLICY_ARN));
      promises.push(AWSWrapper.attachRolePolicy(store.AWS.IAM.Role.RoleName, constants.TIMESTREAM_POLICY_ARN));
      promises.push(AWSWrapper.attachRolePolicy(store.AWS.IAM.Role.RoleName, constants.S3_POLICY_ARN));

      // store.IAM.Role = newRole

      Promise.all(promises).then(() => {
        store.AWS.IAM.Role = newRole;
        resolve(newRole);
      });
    });
  });
}
