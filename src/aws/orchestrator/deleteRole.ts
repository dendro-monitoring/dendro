import detachRolePolicies from './detachRolePolicies';
import { AWS_IAM_ROLE_NAME } from '../../constants';
import AWS = require('aws-sdk');
const iam = new AWS.IAM();

export default async function deleteRole(): Promise<any> {
  await detachRolePolicies();
  return new Promise(resolve => {
    iam.deleteRole({ RoleName: AWS_IAM_ROLE_NAME }, (err, data) => {
      if (err && err.code !== "NoSuchEntity") {
        throw new Error(err);
      } else resolve(data);
    });
  });
}
