import { AWSError } from 'aws-sdk';
import AWS = require('aws-sdk');
import store from '../../store';

const iam = new AWS.IAM();

export default function getAttachedRolePolicies(): Promise<any> {
  return new Promise(resolve => {
    iam.listAttachedRolePolicies({ RoleName: store.AWS.IAM.RoleName }, (error, roleData) => {
      if (roleData && roleData.AttachedPolicies) {
        const policies = roleData.AttachedPolicies.map(policy => policy.PolicyArn);
        resolve(policies);
      } else if (error.code !== "NoSuchEntity") {
        throw new Error(error);
      } else resolve(null);
    });
  });

}
