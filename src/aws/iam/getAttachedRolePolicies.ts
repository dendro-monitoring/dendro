import { AWS_IAM, AWS_IAM_ROLE_NAME } from '../../constants';

export default function getAttachedRolePolicies(): Promise<any> {
  return new Promise(resolve => {
    AWS_IAM.listAttachedRolePolicies({ RoleName: AWS_IAM_ROLE_NAME }, (error, roleData) => {
      if (roleData && roleData.AttachedPolicies) {
        const policies = roleData.AttachedPolicies.map(policy => policy.PolicyArn);
        resolve(policies);
      } else if (error.code !== 'NoSuchEntity') {
        throw new Error(String(error));
      } else resolve(null);
    });
  });

}
