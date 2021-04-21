import { AWS_TIMESTREAM_DATABASE_NAME } from '../../constants';

import AWSWrapper from '../../aws';
import setupTimestreamTables from './setupTimestreamTables';

export default function setupTimestream(): Promise<void> {
  return new Promise(resolve => {
    AWSWrapper.createTimestreamDatabase(AWS_TIMESTREAM_DATABASE_NAME).then( async () => {
      await setupTimestreamTables();
      resolve();
    });
  });
}
