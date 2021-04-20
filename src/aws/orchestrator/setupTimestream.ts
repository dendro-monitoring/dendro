import createTimestreamDatabase from '../../aws/timestream/createTimestreamDatabase';
import setupTimestreamTables from './setupTimestreamTables';

import store from '../../store';

export default function setupTimestream(): Promise<void> {
  return new Promise(resolve => {
    createTimestreamDatabase(store.AWS.Timestream.DatabaseName!).then( async (databaseData) => {
      await setupTimestreamTables();
      resolve();
    });

  });
}
