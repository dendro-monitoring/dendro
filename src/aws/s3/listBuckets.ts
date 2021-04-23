import { AWSError } from 'aws-sdk';
import { s3 } from '../singletons';

export default function listBuckets(): Promise<any>{
  return new Promise(resolve => {
    s3.listBuckets((err: AWSError, data) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}
