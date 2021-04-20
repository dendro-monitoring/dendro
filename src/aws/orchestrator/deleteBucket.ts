import AWS = require('aws-sdk');
import { AWSError } from 'aws-sdk';
import store from '../../store';

const s3 = new AWS.S3();
console.log();

export default function deleteBucket(): Promise<any> {
  return new Promise(resolve => {

    const bucketParams = {
      Bucket: store.AWS.S3.bucketName,
    };

    s3.deleteBucket(bucketParams, (err: AWSError, data) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}

