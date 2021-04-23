import { AWSError } from 'aws-sdk';
import { AWS_CLOUDWATCH } from '../../constants';

import store from '../../store';

export default function getLogEvents(
  logGroupName: string,
  logStreamName: string,
  startFromHead = true,
  startTime?: number,
  endTime?: number
): Promise<any> {
  return new Promise((resolve, reject) => {
    const params = {
      logGroupName,
      logStreamName,
      nextToken: store.AWS.Cloudwatch.NextToken,
      startFromHead,
      endTime,
      startTime
    };
    AWS_CLOUDWATCH.getLogEvents(params as unknown as any, function(err: AWSError, data: any) {
      if (err) return reject(err);

      if (data.events.length === 0) {
        store.AWS.Cloudwatch.NextToken = null;
      } else {
        store.AWS.Cloudwatch.NextToken = data.nextForwardToken;
      }

      resolve(data.events);

    });
  });
}
