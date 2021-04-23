import { AWSError } from 'aws-sdk';
import { AWS_IAM } from '../../constants';

export default function listRoles(): Promise<any> {
  return new Promise((resolve, reject) => {
    AWS_IAM.listRoles({}, (err: AWSError, data: any) => {
      if (err) return reject(err);
      resolve(data.Roles);
    });
  });
}
