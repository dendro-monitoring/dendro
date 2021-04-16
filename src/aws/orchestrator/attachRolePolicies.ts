/* eslint-disable max-lines-per-function */
import { Function } from "aws-sdk/clients/greengrass";
import attachRolePolicy from "../iam/attachRolePolicy";
import store from '../../store';
import constants from '../../constants';

interface attachRolePoliciesArgs {
  resolve: <>() => void;
}

export default function attachRolePolicies(
  resolve: attachRolePoliciesArgs
): void {
  const promises: Promise<any>[] = [];
  promises.push(attachRolePolicy(
    store.AWS.IAM.RoleName, constants.FIREHOSE_POLICY_ARN
  ));
  promises.push(attachRolePolicy(
    store.AWS.IAM.RoleName, constants.LAMBDA_POLICY_ARN)
  );
  promises.push(attachRolePolicy(
    store.AWS.IAM.RoleName, constants.TIMESTREAM_POLICY_ARN)
  );
  promises.push(attachRolePolicy(
    store.AWS.IAM.RoleName, constants.S3_POLICY_ARN)
  );
  Promise.all(promises).then(() => {
    resolve();
  });
}
