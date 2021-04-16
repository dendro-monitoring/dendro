
import store from '../store';
import AWSWrapper from '../aws';

export default function createBucket(): Promise<void> {
  console.log('====================================');
  console.log(store.AWS.S3);
  console.log('====================================');
  return new Promise(resolve => {
    AWSWrapper.createBucket(store.AWS.S3.bucketName).then(() => {
      resolve();
    });
  });
}

