import AWSWrapper from '../aws';
import store from '../store';

const DATABASE_NAME = 'dendroflumechuck-timestream12';
const TABLE_NAME = 'default-table';

export default function setupTimestream(): Promise<void> {
  return new Promise(resolve => {
    AWSWrapper.createTimestreamDatabase(store.AWS.Timestream.DatabaseName).then( (databaseData) => {
      AWSWrapper.createTimestreamTable({ DatabaseName: store.AWS.Timestream.DatabaseName, TableName: store.AWS.Timestream.TableName } as any).then( (TableData) => {
        store.AWS.Timestream.DatabaseData = databaseData;
        console.log(TableData);
        resolve();
      });
    });

  });
}
