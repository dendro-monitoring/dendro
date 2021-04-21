import { AWSError } from 'aws-sdk';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3();

export default function listBuckets(): Promise<any> {
  return new Promise(resolve => {
    s3.listBuckets((err: AWSError, data) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}
