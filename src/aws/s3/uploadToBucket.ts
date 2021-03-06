import * as path from 'path';
import * as fs from 'fs';

import { AWS_S3 } from '../../constants';

export default function uploadToBucket(Bucket: string, file: string): Promise<any> {
  return new Promise(resolve => {
    const uploadParams = { Bucket, Key: '', Body: '' };

    if (!fs.existsSync(file)) throw new Error('Cannot open file');

    const fileStream = fs.createReadStream(file);

    fileStream.on('error', err => {
      throw new Error(err);
    });

    uploadParams.Body = String(fileStream);
    uploadParams.Key = path.basename(file);

    AWS_S3.upload(uploadParams, (err: Error, data: any) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}
