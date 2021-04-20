import { AWSError } from 'aws-sdk';
import AWS = require('aws-sdk');

import store from '../../store';

AWS.config.update({ region: store.AWS.region });
const lambda = new AWS.Lambda();

export default function listFunctions(): Promise<any> {
  return new Promise(resolve => {
    lambda.listFunctions({}, (err: AWSError, data) => {
      if (err) throw new Error(err as unknown as string);
      else resolve(data);
    });
  });
}
