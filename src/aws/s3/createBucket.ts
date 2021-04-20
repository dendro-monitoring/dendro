import AWS = require('aws-sdk');
import { AWSError } from 'aws-sdk';

import store from '../../store';

const s3 = new AWS.S3();

export default function createBucket(bucketName: string): Promise<any> {
  return new Promise(resolve => {
    AWS.config.update({ region: store.AWS.region });

    const bucketParams = {
      Bucket: bucketName,
    };

    s3.createBucket(bucketParams, (err: AWSError, data) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}

