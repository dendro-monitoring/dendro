import AWS = require('aws-sdk');
import { AWSError } from 'aws-sdk';

const s3 = new AWS.S3();

export default function createBucket(bucketName: string, region = 'us-east-1'): Promise<any> {
  return new Promise(resolve => {
    AWS.config.update({ region });

    const bucketParams = {
      Bucket: bucketName,
    };

    s3.createBucket(bucketParams, (err: AWSError, data) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}

