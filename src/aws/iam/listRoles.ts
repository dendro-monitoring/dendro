import { AWSError } from 'aws-sdk';
import { AWS_IAM, AWS_IAM_ROLE_NAME } from '../../constants';

export default function listRoles(): Promise<any> {
  return new Promise((resolve, reject) => {
    interface Role {
      RoleName: string;
    }
    AWS_IAM.listRoles({}, (err: AWSError, data: any) => {
      if (err) return reject(err);
      resolve(data.Roles.filter( ({ RoleName }: Role) => RoleName === AWS_IAM_ROLE_NAME));
    });
  });
}
