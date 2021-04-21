import AWSWrapper from '../../aws';
import store from '../../store';
import listRoles from '../iam/listRoles';
import attachRolePolicies from './attachRolePolicies';
import ensureRolePoliciesAreAttached from './ensureRolePoliciesAreAttached';

import { AWS_IAM_ROLE_NAME } from '../../constants';

export default function createRole(): Promise<void> {
  return new Promise(resolve => {

    AWSWrapper.createRole(AWS_IAM_ROLE_NAME, ['firehose.amazonaws.com', 'lambda.amazonaws.com']).then(async newRole => {
      if (newRole) {
        await attachRolePolicies();
        await ensureRolePoliciesAreAttached();
        store.AWS.IAM.Arn = newRole.Role.Arn;
        resolve();
      } else {
        const roles: any = await listRoles();
        store.AWS.IAM.Arn = roles.find((role: any) => role.RoleName === AWS_IAM_ROLE_NAME).Arn;
        resolve();
      }
    });
  });
}
