import AWS = require('aws-sdk');
import { AWSError } from 'aws-sdk';

const iam = new AWS.IAM();

export default function attachLambdaBasicExecutionPolicy(RoleName: string): Promise<{}> {
  return new Promise(resolve => {
    const params = {
      PolicyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
      RoleName,
    };

    iam.attachRolePolicy(params, (err: AWSError, data: {}) => {
      resolve([err, data]);
    });
  });
}

