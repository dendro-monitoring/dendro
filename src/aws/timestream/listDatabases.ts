import { AWSError } from 'aws-sdk';
import { AWS_TIMESTREAM_WRITE } from '../../constants';

export default function listDatabases(): Promise<any> {
  return new Promise(resolve => {
    AWS_TIMESTREAM_WRITE.listDatabases({}, (err: AWSError, data: any) => {
      if (err) throw new Error(err as unknown as string);
      else resolve(data);
    });
  });
}
