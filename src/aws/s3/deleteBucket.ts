import AWS = require('aws-sdk');
import { AWSError } from 'aws-sdk';

<<<<<<< HEAD

=======
>>>>>>> 0becc9cc1b4db997d07357e1fb3c471766f7922a
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

export default function deleteBucket(Bucket: string, region = 'us-east-1'): Promise<any> {
  return new Promise(resolve => {
    AWS.config.update({ region });

    const bucketParams = {
      Bucket,
    };

    s3.deleteBucket(bucketParams, (err: AWSError, data) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}
