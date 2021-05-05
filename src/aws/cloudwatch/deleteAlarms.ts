import * as AWS from 'aws-sdk';
import { AWS_REGION } from '../../constants';

const cloudwatch = new AWS.CloudWatch({ region: AWS_REGION });

export default async function deleteAlarms(params: { AlarmNames: string[]; }): Promise<any> {
  return new Promise((resolve, reject) => {
    cloudwatch.deleteAlarms(params, function(err, data) {
      if (err) reject(err);

      resolve(data);
    });
  });
}
