import { AWSError } from 'aws-sdk';
import { AWS_LAMBDA } from '../../constants';

export default function listFunctions(): Promise<any> {
  return new Promise(resolve => {
    AWS_LAMBDA.listFunctions({}, (err: AWSError, data) => {
      if (err) throw new Error(err as unknown as string);
      else resolve(data);
    });
  });
}
