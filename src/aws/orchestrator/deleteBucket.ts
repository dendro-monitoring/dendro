import AWS = require('aws-sdk');
import AWSWrapper from '../../aws';
import { AWSError } from 'aws-sdk';
import { AWS_S3_BUCKET_NAME } from '../../constants';

export default async function deleteBucket(): Promise<any> {
  const listOfBuckets = await AWSWrapper.listBuckets();
  let bucketToDelete;

  if (listOfBuckets) {
    listOfBuckets.Buckets.forEach(bucket => {
      if (bucket.Name.substring(0, 16) === AWS_S3_BUCKET_NAME.substring(0, 16)) {
        bucketToDelete = bucket.Name;
      }
    });
  }

  if (bucketToDelete) {
    await AWSWrapper.deleteObjects(bucketToDelete);
    await AWSWrapper.deleteBucket(bucketToDelete);
  }
}
