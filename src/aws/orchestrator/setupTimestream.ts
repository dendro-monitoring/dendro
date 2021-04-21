import createTimestreamDatabase from '../../aws/timestream/createTimestreamDatabase';
import setupTimestreamTables from './setupTimestreamTables';

import { AWS_TIMESTREAM_DATABASE_NAME } from '../../constants';

export default function setupTimestream(): Promise<void> {
  return new Promise(resolve => {
    createTimestreamDatabase(AWS_TIMESTREAM_DATABASE_NAME).then( async () => {
      await setupTimestreamTables();
      resolve();
    });
  });
}
