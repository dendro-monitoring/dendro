import { AWSError } from 'aws-sdk';
import { AWS_IAM } from '../../constants';

export default function createRole(RoleName: string, Service: string[]): Promise<any> {
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

    AWS_IAM.createRole(params, (err: AWSError, data) => {
      if (err && err.code !== 'EntityAlreadyExists') {
        throw new Error(String(err));
      } else resolve(data);
    });
  });
}
