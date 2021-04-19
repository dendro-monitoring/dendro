import { AWSError } from 'aws-sdk';
import * as AWS from 'aws-sdk';

const iam = new AWS.IAM();

export default function listRoles(): Promise<any> {
  return new Promise(resolve => {
    iam.listRoles({}, (err: AWSError, data: any) => {
      // TODO: resolve?
      if (err) resolve(err);
      resolve(data.Roles);
    });
  });
}
