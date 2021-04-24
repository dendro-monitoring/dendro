/* eslint-disable max-lines-per-function */
import { AWSError } from 'aws-sdk';
import { AWS_S3 } from '../../constants';
import listObjects from './listObjects';

export default async function deleteObjects(Bucket: string): Promise<any> {
  const objectsToDelete = await listObjects(Bucket);

  const params = {
    Bucket,
    Delete: {
      Objects: objectsToDelete ? objectsToDelete.Contents.map((object: { Key: string}) => {
        return { Key: object.Key };
      }) : []
    }
  };

  return new Promise(resolve => {
    if (objectsToDelete.Contents.length === 0) {
      resolve(null);
      return;
    }
    AWS_S3.deleteObjects(params, (err: AWSError, data) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}
