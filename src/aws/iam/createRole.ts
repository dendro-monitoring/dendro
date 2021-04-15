import AWS = require('aws-sdk');
import { AWSError } from 'aws-sdk';

const iam = new AWS.IAM();

export default function createRole(RoleName: string, Service: string): Promise<{}> {
  return new Promise(resolve => {
    const params = {
      AssumeRolePolicyDocument: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              Service,
            },
            Action: [
              'sts:AssumeRole',
            ],
          },
        ],
      }),
      Path: '/',
      RoleName,
    };

    iam.createRole(params, (err: AWSError, data: {}) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}
