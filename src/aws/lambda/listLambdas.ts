import AWS = require('aws-sdk');
import { AWSError } from 'aws-sdk';
const lambda = new AWS.Lambda();

export default function listLambdas(): Promise<any> {
  return new Promise(resolve => {
    AWS.config.update({ region: 'us-east-1' });
    lambda.listFunctions((err: AWSError, data) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}

