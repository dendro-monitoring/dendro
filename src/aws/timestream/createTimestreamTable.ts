import * as AWS from 'aws-sdk';
import { AWSError } from 'aws-sdk';

interface TimestreamTableData {
  DatabaseName: string,
  TableName: string,
  MagneticStoreRetentionPeriodInDays: string,
  MemoryStoreRetentionPeriodInHours: string,
  region: string
}

export default function createTimestreamTable({
  DatabaseName,
  TableName,
  MagneticStoreRetentionPeriodInDays = '30',
  MemoryStoreRetentionPeriodInHours = '720',
  region = 'us-east-1',
}: TimestreamTableData ): Promise<any> {
  return new Promise(resolve => {
    AWS.config.update({ region });

    const Timestream = new AWS.TimestreamWrite();

    const params: any = {
      DatabaseName, /* required */
      TableName, /* required */
      RetentionProperties: {
        MagneticStoreRetentionPeriodInDays, /* required */
        MemoryStoreRetentionPeriodInHours, /* required */
      },
    };
    Timestream.createTable(params, (err: AWSError, data) => {
      if (err && err.code !== 'ConflictException') throw new Error(String(err));
      else resolve([err, data]);
    });
  });
}
