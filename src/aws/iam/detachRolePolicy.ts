import { AWSError } from 'aws-sdk';
import { AWS_IAM } from '../../constants';

export default function detachRolePolicy(RoleName: string, PolicyArn: string): Promise<any> {
  return new Promise(resolve => {
    const params = {
      PolicyArn,
      RoleName,
    };

    AWS_IAM.detachRolePolicy(params, (err: AWSError, data) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}
