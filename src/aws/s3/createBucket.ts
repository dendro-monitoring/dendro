import * as AWS from 'aws-sdk';
import { AWSError } from 'aws-sdk';
import { AWS_REGION } from '../../constants';

const s3 = new AWS.S3();

export default function createBucket(bucketName: string, region = AWS_REGION): Promise<any> {
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

