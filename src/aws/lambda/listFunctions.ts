import { AWSError } from 'aws-sdk';
import { lambda } from '../singletons';

export default function listFunctions(): Promise<any> {
  return new Promise(resolve => {
    lambda.listFunctions({}, (err: AWSError, data) => {
      if (err) throw new Error(err as unknown as string);
      else resolve(data);
    });
  });
}
