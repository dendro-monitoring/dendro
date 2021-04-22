import AWSWrapper from '../../aws';
import store from '../../store';
import listRoles from '../iam/listRoles';
import attachRolePolicies from './attachRolePolicies';
import ensureRolePoliciesAreAttached from './ensureRolePoliciesAreAttached';

import { AWS_IAM_ROLE_NAME } from '../../constants';
import arePoliciesAttached from '../iam/arePoliciesAttached';

export default function createRole(): Promise<void> {
  async function attachPolicies(): Promise<void> {
    await attachRolePolicies();
    await ensureRolePoliciesAreAttached();
  }
  return new Promise(resolve => {

    AWSWrapper.createRole(AWS_IAM_ROLE_NAME, ['firehose.amazonaws.com', 'lambda.amazonaws.com']).then(async newRole => {
      if (newRole) {
        store.AWS.IAM.Arn = newRole.Role.Arn;
        console.log('attaching policies');
        const roleData = await AWSWrapper.getRole( AWS_IAM_ROLE_NAME );
        console.log('====================================');
        console.log(roleData);
        console.log('====================================');
        await attachPolicies();
        console.log(await arePoliciesAttached());

        resolve();
      } else {
        const roles: any = await listRoles();
        const isAttached = await arePoliciesAttached();
        store.AWS.IAM.Arn = roles.find((role: any) => role.RoleName === AWS_IAM_ROLE_NAME).Arn;
        if (!isAttached) await attachPolicies();

        resolve();
      }
    });
  });
}
