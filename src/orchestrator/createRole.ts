// const store = require('../store')
import AWSWrapper from '../aws';
import store from '../store';
import constants from '../constants';

export default function createRole(): Promise<void> {
  return new Promise(resolve => {
    const promises: Promise<any>[] = [];

    AWSWrapper.createRole(store.AWS.IAM.RoleName, ['firehose.amazonaws.com', 'lambda.amazonaws.com']).then(newRole => {
      console.log(store.AWS.IAM.RoleName);

      promises.push(AWSWrapper.attachRolePolicy(store.AWS.IAM.RoleName, constants.FIREHOSE_POLICY_ARN));
      promises.push(AWSWrapper.attachRolePolicy(store.AWS.IAM.RoleName, constants.LAMBDA_POLICY_ARN));
      promises.push(AWSWrapper.attachRolePolicy(store.AWS.IAM.RoleName, constants.TIMESTREAM_POLICY_ARN));
      promises.push(AWSWrapper.attachRolePolicy(store.AWS.IAM.RoleName, constants.S3_POLICY_ARN));


      Promise.all(promises).then(() => {
        store.AWS.IAM.RoleData = newRole.Role;
        resolve();
      });
    });
  });
}