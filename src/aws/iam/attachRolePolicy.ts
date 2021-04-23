import { AWSError } from 'aws-sdk';
import { iam } from '../singletons';

export default function attachRolePolicy(RoleName: string, PolicyArn: string): Promise<any> {
  return new Promise(resolve => {
    const params = {
      PolicyArn,
      RoleName,
    };

    iam.attachRolePolicy(params, (err: AWSError, data) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}
