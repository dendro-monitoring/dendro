import * as AWS from 'aws-sdk';
import { AWSError } from 'aws-sdk';
import { AWS_REGION } from '../../constants';

const cloudwatch = new AWS.CloudWatchLogs({ region: AWS_REGION });

export default function describeLogStreams(logGroupName: string, descending = true): Promise<any> {
  return new Promise(resolve => {
    const params = {
      logGroupName,
      descending,
    };
    cloudwatch.describeLogStreams(params as unknown as any, function(err: AWSError, { logStreams }) {
      if (err) throw new Error(String(err));
      else resolve(logStreams);
    });
  });
}
