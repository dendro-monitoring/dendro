import { AWSError } from 'aws-sdk';
import * as AWS from 'aws-sdk';
import { AWS_REGION } from '../../constants';

AWS.config.update({ region: AWS_REGION });
const lambda = new AWS.Lambda();

export default function listFunctions(): Promise<any> {
  return new Promise(resolve => {
    lambda.listFunctions({}, (err: AWSError, data) => {
      if (err) throw new Error(err as unknown as string);
      else resolve(data);
    });
  });
}
