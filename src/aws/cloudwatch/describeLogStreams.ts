import * as AWS from 'aws-sdk';
import { AWSError } from 'aws-sdk';
import { AWS_REGION } from '../../constants';

import store from '../../store';

const cloudwatch = new AWS.CloudWatchLogs({ region: AWS_REGION });

export default function describeLogStreams(logGroupName: string, descending = true): Promise<any> {
  return new Promise((resolve, reject) => {
    const params = {
      logGroupName,
      descending,
    };
    cloudwatch.describeLogStreams(params as unknown as any, function(err: AWSError, data) {
      if (err) reject(err);
      else {
        store.AWS.Cloudwatch.NextToken = data.nextToken;
        resolve(data.logStreams);
      }
    });
  });
}
