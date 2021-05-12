import { AWSError } from 'aws-sdk';

import { AWS_CLOUDWATCH, AWS_LAMBDA_FUNCTION_NAME } from '../../constants';
import store from '../../store';

export default function describeLogStreams(logGroupName = `/aws/lambda/${AWS_LAMBDA_FUNCTION_NAME}`, descending = true): Promise<any> {
  return new Promise((resolve, reject) => {
    const params = {
      logGroupName,
      descending,
    };
    AWS_CLOUDWATCH.describeLogStreams(params as unknown as any, function(err: AWSError, data) {
      store.AWS.Cloudwatch.NextToken = data.nextToken;
      if (err) reject(err);
      else {
        resolve(data.logStreams);
      }
    });
  });
}
