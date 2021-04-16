import { AWSError } from 'aws-sdk';
import AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });
const lambda = new AWS.Lambda();

export default function listFunctions(): Promise<any> {
  return new Promise(resolve => {
    lambda.listFunctions({}, (err: AWSError, data: any) => {
      if (err) throw new Error(err as unknown as string);
      else resolve(data);
    });
  });
}
