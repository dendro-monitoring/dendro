import AWS = require('aws-sdk');
import { AWSError } from 'aws-sdk';
// TODO: The following bucket name import doesn't work, because it's not really a constant
import { AWS_S3_BUCKET_NAME } from '../../constants';

const s3 = new AWS.S3();
console.log();

export default function deleteBucket(): Promise<any> {
  return new Promise(resolve => {

    const bucketParams = {
      Bucket: AWS_S3_BUCKET_NAME,
    };

    s3.deleteBucket(bucketParams, (err: AWSError, data) => {
      if (err && err.code === "NoSuchBucket") {
        resolve(err);
      } else if (err) {
        throw new Error(String(err));
      } else resolve(data);
    });
  });
}

