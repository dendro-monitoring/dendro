import AWS = require('aws-sdk');

import store from '../../store/';

import { AWS_REGION } from '../../constants';

const cloudwatchlogs = new AWS.CloudWatchLogs({ region: AWS_REGION });

export default function describeLogGroups(): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const params = {
      nextToken: store.AWS.Cloudwatch.NextToken
    };

    cloudwatchlogs.describeLogGroups(params as unknown as any, function(err, data) {
      if (err) reject(err);
      else {
        store.AWS.Cloudwatch.NextToken = data.nextToken;
        resolve(data.logGroups);
      }
    });
  });
}
