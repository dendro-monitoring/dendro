import AWSWrapper from '../..';
import { AWS_S3_BUCKET_NAME } from '../../../constants';

export default async function deleteBucket(): Promise<any> {
  const listOfBuckets = await AWSWrapper.listBuckets();
  let bucketToDelete;

  if (listOfBuckets) {
    for (const bucket of listOfBuckets) {
      if (bucket.Name.substring(0, 16) === AWS_S3_BUCKET_NAME.substring(0, 16)) {
        bucketToDelete = bucket.Name;
        await AWSWrapper.deleteObjects(bucketToDelete);
        await AWSWrapper.deleteBucket(bucketToDelete);
      }
    }
  }

}
