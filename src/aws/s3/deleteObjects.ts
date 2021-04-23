/* eslint-disable max-lines-per-function */
import { AWSError } from 'aws-sdk';
import * as AWS from 'aws-sdk';
import listObjects from './listObjects';

const s3 = new AWS.S3();

export default async function deleteObjects(Bucket: string): Promise<any> {
  const objectsToDelete = await listObjects(Bucket);

  const params = {
    Bucket,
    Delete: {
      Objects: objectsToDelete ? objectsToDelete.Contents.map(object => {
        return { Key: object.Key };
      }) : []
    }
  };

  return new Promise(resolve => {
    if (objectsToDelete.Contents.length === 0) {
      resolve(null);
      return;
    }
    s3.deleteObjects(params, (err: AWSError, data) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}
