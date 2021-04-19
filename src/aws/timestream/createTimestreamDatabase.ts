import AWS = require('aws-sdk');
import { AWSError } from 'aws-sdk';

export default function createTimestreamDatabase(DatabaseName: string, region = 'us-east-1'): Promise<any> {
  return new Promise(resolve => {
    AWS.config.update({ region });

    const Timestream = new AWS.TimestreamWrite();

    const params = {
      DatabaseName,
    };

    Timestream.createDatabase(params, (err: AWSError, data) => {
      if (err && err.code !== 'ConflictException') throw new Error(String(err));
      else resolve(data);
    });
  });
}
