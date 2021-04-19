import * as AWS from 'aws-sdk';
import { AWSError } from 'aws-sdk';
import { AWS_REGION } from '../../constants';

const cloudwatch = new AWS.CloudWatchLogs({ region: AWS_REGION });

export default function describeLogStreams(logGroupName: string): Promise<any> {
  return new Promise(resolve => {
    const params = {
      logGroupName, /* required */
      descending: true || false,
    };
    cloudwatch.describeLogStreams(params as unknown as any, function(err: AWSError, data) {
      if (err) throw new Error(String(err)); // an error occurred
      else resolve(data);          // successful response
    });
  });
}
