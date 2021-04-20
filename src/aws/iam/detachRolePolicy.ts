import { AWSError } from 'aws-sdk';
import AWS = require('aws-sdk');

const iam = new AWS.IAM();

export default function detachRolePolicy(RoleName: string, PolicyArn: string): Promise<any> {
  return new Promise(resolve => {
    const params = {
      PolicyArn,
      RoleName,
    };

    iam.detachRolePolicy(params, (err: AWSError, data) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}
