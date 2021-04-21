import attachRolePolicy from "../iam/attachRolePolicy";
import constants from '../../constants';

import { AWS_IAM_ROLE_NAME } from '../../constants';

export default function attachRolePolicies(
  resolve: () => any
): void {
  const promises: Promise<any>[] = [];
  promises.push(attachRolePolicy(
    AWS_IAM_ROLE_NAME, constants.FIREHOSE_POLICY_ARN
  ));
  promises.push(attachRolePolicy(
    AWS_IAM_ROLE_NAME, constants.LAMBDA_POLICY_ARN)
  );
  promises.push(attachRolePolicy(
    AWS_IAM_ROLE_NAME, constants.TIMESTREAM_POLICY_ARN)
  );
  promises.push(attachRolePolicy(
    AWS_IAM_ROLE_NAME, constants.S3_POLICY_ARN)
  );
  Promise.all(promises).then(() => {
    resolve();
  });
}
