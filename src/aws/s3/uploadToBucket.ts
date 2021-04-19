import path = require('path');
import fs = require('fs');

import * as AWS from 'aws-sdk';

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

export default function uploadToBucket(Bucket: string, file: string, region = 'us-east-1'): Promise<any> {
  return new Promise(resolve => {
    AWS.config.update({ region });

    const uploadParams = { Bucket, Key: '', Body: '' };

    if (!fs.existsSync(file)) throw new Error('Cannot open file');

    const fileStream = fs.createReadStream(file);

    fileStream.on('error', err => {
      throw new Error(err);
    });

    uploadParams.Body = String(fileStream);
    uploadParams.Key = path.basename(file);

    s3.upload(uploadParams, (err: Error, data: any) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}
