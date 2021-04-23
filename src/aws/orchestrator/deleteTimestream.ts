import listTables from "./listTables";
import deleteTable from '../timestream/deleteTable';
import deleteDatabase from '../timestream/deleteDatabase';

import { AWS_TIMESTREAM_DATABASE_NAME } from '../../constants';

export default function deleteTimestream(DatabaseName: string = AWS_TIMESTREAM_DATABASE_NAME): Promise<void> {
  return new Promise(async resolve => {
    const tables = await listTables(DatabaseName);
    const promises: Promise<any>[] = [];

    if (tables) {
      tables.forEach((table: { TableName: string }) => {
        promises.push(deleteTable(DatabaseName, table.TableName));
      });

      await Promise.all(promises);
    }

    deleteDatabase(DatabaseName);

    resolve();
  });
}
