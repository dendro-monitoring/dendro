import detachRolePolicies from './detachRolePolicies';
import { AWS_IAM, AWS_IAM_ROLE_NAME } from '../../../constants';

export default async function deleteRole(): Promise<any> {
  await detachRolePolicies();
  return new Promise(resolve => {
    AWS_IAM.deleteRole({ RoleName: AWS_IAM_ROLE_NAME }, (err) => {
      if (err && err.code === 'NoSuchEntity') {
        resolve(err);
      } else if (err) {
        throw new Error(String(err));
      } else resolve(null);
    });
  });
}
