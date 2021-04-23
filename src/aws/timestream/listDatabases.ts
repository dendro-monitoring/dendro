import { AWSError } from 'aws-sdk';
import { timestreamWrite } from '../singletons';

export default function listDatabases(): Promise<any> {
  return new Promise(resolve => {
    timestreamWrite.listDatabases({}, (err: AWSError, data: any) => {
      if (err) throw new Error(err as unknown as string);
      else resolve(data);
    });
  });
}
