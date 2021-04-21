/* eslint-disable max-lines-per-function */
import AWS = require('aws-sdk');
import constants, { AWS_IAM_ROLE_NAME } from '../../constants';

const iam = new AWS.IAM();
const ROLE_POLICIES = [
  constants.LAMBDA_POLICY_ARN,
  constants.FIREHOSE_POLICY_ARN,
  constants.TIMESTREAM_POLICY_ARN,
  constants.S3_POLICY_ARN
];

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

function asyncRetry(array: Array<any>, callback: (input: string) => void): Promise<void> {
  return new Promise(resolve => {
    (async () => {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index]);
      }
      resolve();
    })();
  });
}

export default function arePoliciesAttached(): Promise<boolean> {
  return new Promise(resolve => {
    iam.listAttachedRolePolicies({ RoleName: AWS_IAM_ROLE_NAME }, (err, data: any) => {
      if (err) throw new Error(String(err));

      const returnedPolicyArns = data.AttachedPolicies.map((policy: { PolicyArn: string }) => policy.PolicyArn);
      let isPolicyPresent = true;

      asyncRetry(ROLE_POLICIES, async arnValue => {
        if (!returnedPolicyArns.includes(arnValue)) {
          await sleep(1000);
          isPolicyPresent = false;
        }
      }).then(() => {
        console.log('====================================');
        console.log('attached', isPolicyPresent);
        console.log('====================================');
        console.log('====================================');
        console.log(returnedPolicyArns);
        console.log('====================================');
        resolve(isPolicyPresent);
      });
    });
  });
}
