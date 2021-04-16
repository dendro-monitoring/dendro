import AWS = require('aws-sdk');
import { AWSError } from 'aws-sdk';

const cloudwatch = new AWS.CloudWatchLogs({ region: 'us-east-1' });

export default function getLogEvents(logGroupName: string, logStreamName: string): Promise<any> {
  return new Promise(resolve => {
    const params = {
      logGroupName, /* required */
      logStreamName, /* required */
      // endTime: 'NUMBER_VALUE',
      // limit: 'NUMBER_VALUE',
      // nextToken: 'STRING_VALUE',
      // startFromHead: true || false,
      // startTime: 'NUMBER_VALUE'
    };
    cloudwatch.getLogEvents(params as unknown as any, function(err: AWSError, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
  });
}
