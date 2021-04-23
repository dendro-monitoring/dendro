import { AWSError } from 'aws-sdk';
import { timestreamWrite } from '../singletons';

export default function createTimestreamDatabase(DatabaseName: string): Promise<any> {
  return new Promise(resolve => {
    const params = {
      DatabaseName,
    };

    timestreamWrite.createDatabase(params, (err: AWSError, data) => {
      if (err && err.code !== 'ConflictException') throw new Error(String(err));
      else resolve(data);
    });
  });
}
