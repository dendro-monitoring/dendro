import { AWSError } from 'aws-sdk';
import { AWS_S3 } from '../../constants';

export default function listObjects(Bucket: string): Promise<any> {
  const params = {
    Bucket,
  };

  return new Promise(resolve => {
    AWS_S3.listObjectsV2(params, (err: AWSError, data) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}
