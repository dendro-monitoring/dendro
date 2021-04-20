/* eslint-disable max-lines-per-function */
import AWS = require('aws-sdk');
const iam = new AWS.IAM();
import constants from '../../constants';
import store from '../../store';
const ROLE_POLICIES = [
  constants.LAMBDA_POLICY_ARN,
  constants.FIREHOSE_POLICY_ARN,
  constants.TIMESTREAM_POLICY_ARN,
  constants.S3_POLICY_ARN
];

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export default function arePoliciesAttached(): Promise<boolean> {
  return new Promise(resolve => {
    iam.listAttachedRolePolicies({ RoleName: store.AWS.IAM.RoleName! }, (err, data) => {
      if (err) throw new Error(err);
      if (!data.AttachedPolicies) {
        resolve(false);
      }
      const returnedPolicyArns = data.AttachedPolicies.map(policy => policy.PolicyArn);
      let isPolicyPresent = true;
      ROLE_POLICIES.forEach(async arnValue => {
        if (!returnedPolicyArns.includes(arnValue)) {
          await sleep(1000);
          isPolicyPresent = false;
        }
      });
      resolve(isPolicyPresent);
    });
  });
}
