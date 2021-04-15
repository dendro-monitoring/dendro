
import store from '../store';
import AWSWrapper from '../aws';

export default function createBucket(): Promise<any> {
  return new Promise(resolve => {
    AWSWrapper.createBucket(store.AWS.S3.bucketName).then((bucketData) => {
      resolve(bucketData);
    });
  });
}

