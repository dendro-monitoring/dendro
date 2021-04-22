import * as AWS from 'aws-sdk';
import { AWSError } from 'aws-sdk';
import { AWS_REGION } from '../../constants';

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

export default function deleteBucket(Bucket: string, region = AWS_REGION): Promise<any> {
  return new Promise(resolve => {
    AWS.config.update({ region });

    const bucketParams = {
      Bucket,
    };

    s3.deleteBucket(bucketParams, (err: AWSError) => {
      if (err && err.code === "NoSuchBucket") {
        resolve(err);
      } else if (err) {
        throw new Error(String(err));
      } else resolve(null);
    });
  });
}
