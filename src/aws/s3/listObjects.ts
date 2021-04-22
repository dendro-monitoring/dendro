import { AWSError } from 'aws-sdk';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3();

export default function listObjects(Bucket: string): Promise<any> {
  const params = {
    Bucket,
  };

  return new Promise(resolve => {
    s3.listObjectsV2(params, (err: AWSError, data) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}
