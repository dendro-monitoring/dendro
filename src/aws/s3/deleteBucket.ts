import { AWSError } from 'aws-sdk';
import { AWS_S3 } from '../../constants';
import retry from '../../utils/retry';

export default function deleteBucket(Bucket: string): Promise<any> {
  return new Promise(async resolve => {
    const bucketParams = {
      Bucket,
    };

    let finished = false;
    await retry(13, () => {
      AWS_S3.deleteBucket(bucketParams, (err: AWSError) => {
        if (err && err.code !== 'BucketNotEmpty') {
          resolve(err);
        } else if (!err || err.code === "NoSuchBucket") {
          finished = true;
          resolve(null);
        }
      });
      return finished;
    }, finished);

    if (!finished) {
      throw new Error('Could not delete Bucket!');
    }

  });
}
