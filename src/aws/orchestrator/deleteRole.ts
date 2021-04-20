import detachRolePolicies from './detachRolePolicies';
import store from '../../store';
import AWS = require('aws-sdk');
const iam = new AWS.IAM();

export default async function deleteRole(): Promise<any> {
  await detachRolePolicies();
  return new Promise(resolve => {
    iam.deleteRole({ RoleName: store.AWS.IAM.RoleName }, (err, data) => {
      if (err && err.code !== "NoSuchEntity") {
        throw new Error(err);
      } else resolve(data);
    });
  });
}
