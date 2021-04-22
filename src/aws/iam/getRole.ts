import { AWSError } from 'aws-sdk';
import AWS = require('aws-sdk');

/**
 *
 * @param RoleName name of the role
 * @returns Object containing role data
 */
export default function getRole(RoleName: string): Promise<any>{
  const iam = new AWS.IAM();

  return new Promise(resolve => {
    const params = {
      RoleName
    };

    iam.getRole(params, function(err: AWSError, data: any) {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}
