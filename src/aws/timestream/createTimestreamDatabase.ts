import { AWSError } from 'aws-sdk';
import { AWS_TIMESTREAM_WRITE } from '../../constants';

export default function createTimestreamDatabase(DatabaseName: string): Promise<any> {
  return new Promise(resolve => {
    const params = {
      DatabaseName,
    };

    AWS_TIMESTREAM_WRITE.createDatabase(params, (err: AWSError, data) => {
      if (err && err.code !== 'ConflictException') throw new Error(String(err));
      else resolve(data);
    });
  });
}
