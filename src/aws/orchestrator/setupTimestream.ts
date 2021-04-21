import AWSWrapper from '../../aws';
import store from '../../store';
import { AWS_TIMESTREAM_DATABASE_NAME } from '../../constants';

export default function setupTimestream(): Promise<void> {
  return new Promise(resolve => {
    AWSWrapper.createTimestreamDatabase(AWS_TIMESTREAM_DATABASE_NAME).then( (databaseData) => {
      AWSWrapper.createTimestreamTable({ DatabaseName: AWS_TIMESTREAM_DATABASE_NAME, TableName: 'will_be_fixed_in_other_pr' } as any).then((TableData) => {
        store.AWS.Timestream.DatabaseData = databaseData;
        resolve();
      });
    });

  });
}
