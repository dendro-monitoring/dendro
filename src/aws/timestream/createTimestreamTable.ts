import { AWSError } from 'aws-sdk';
import { timestreamWrite } from '../singletons';

interface TimestreamTableData {
  DatabaseName: string,
  TableName: string,
  MagneticStoreRetentionPeriodInDays: string,
  MemoryStoreRetentionPeriodInHours: string,
  region: string
}

/**
 * @param params - Parameters object
 * @param params.DatabaseName Required
 * @param params.TableName Required
 * @param params.MagneticStoreRetentionPeriodInDays defaults to 30
 * @param params.MemoryStoreRetentionPeriod defaults to 720
 * @returns Promise
 */
export default function createTimestreamTable({
  DatabaseName,
  TableName,
  MagneticStoreRetentionPeriodInDays = '365',
  MemoryStoreRetentionPeriodInHours = '168',
}: TimestreamTableData ): Promise<any> {
  return new Promise(resolve => {
    const params: any = {
      DatabaseName,
      TableName,
      RetentionProperties: {
        MagneticStoreRetentionPeriodInDays,
        MemoryStoreRetentionPeriodInHours,
      },
    };
    timestreamWrite.createTable(params, (err: AWSError, data) => {
      if (err && err.code !== 'ConflictException') throw new Error(String(err));
      else resolve([err, data]);
    });
  });
}
