import * as AWS from 'aws-sdk';
import { AWSError } from 'aws-sdk';
import { AWS_REGION } from '../../constants';

export default function createTimestreamDatabase(DatabaseName: string, region = AWS_REGION): Promise<any> {
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
