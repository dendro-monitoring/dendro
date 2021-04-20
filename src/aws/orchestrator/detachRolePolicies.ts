/* eslint-disable max-lines-per-function */
import detachRolePolicy from "../iam/detachRolePolicy";
import getAttachedRolePolicies from "../iam/getAttachedRolePolicies";
import store from '../../store';
import constants from '../../constants';

export default async function detachRolePolicies(): Promise<void> {
  const policies = await getAttachedRolePolicies();

  return new Promise(resolve => {
    const promises: Promise<any>[] = [];
    if (policies) {
      policies.forEach((policy: string) => {
        promises.push(detachRolePolicy(
          store.AWS.IAM.RoleName!, policy
        ));
      });
    }

    Promise.all(promises).then(() => {
      resolve();
    });
  });

}
