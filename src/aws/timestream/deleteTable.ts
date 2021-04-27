import { AWSError } from 'aws-sdk';
import { AWS_TIMESTREAM_WRITE } from '../../constants/index';

export default function deleteTable(DatabaseName: string, TableName: string): Promise<any> {
  return new Promise(async resolve => {
    const params = {
      DatabaseName,
      TableName
    };
    AWS_TIMESTREAM_WRITE.deleteTable(params, (err: AWSError, data) => {
      if (err) throw new Error(String(err));
      else resolve(data);
    });
  });
}
