import { AWSError } from 'aws-sdk';
import { iam } from '../singletons';

export default function listRoles(): Promise<any> {
  return new Promise((resolve, reject) => {
    iam.listRoles({}, (err: AWSError, data: any) => {
      if (err) return reject(err);
      resolve(data.Roles);
    });
  });
}
