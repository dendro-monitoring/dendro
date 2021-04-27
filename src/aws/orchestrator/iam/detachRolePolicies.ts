/* eslint-disable max-lines-per-function */
import detachRolePolicy from '../../iam/detachRolePolicy';
import getAttachedRolePolicies from '../../iam/getAttachedRolePolicies';
import { AWS_IAM_ROLE_NAME } from '../../../constants';

export default async function detachRolePolicies(): Promise<void> {
  const policies = await getAttachedRolePolicies();

  return new Promise(resolve => {
    const promises: Promise<any>[] = [];
    if (policies) {
      policies.forEach((policy: string) => {
        promises.push(detachRolePolicy(
          AWS_IAM_ROLE_NAME, policy
        ));
      });
    }

    Promise.all(promises).then(() => {
      resolve();
    });
  });

}
