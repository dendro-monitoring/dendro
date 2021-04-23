import { AWSError } from 'aws-sdk';
import { AWS_S3 } from '../../constants';

export default function listBuckets(): Promise<any>{
  return new Promise(resolve => {
    AWS_S3.listBuckets((err: AWSError, data) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}
