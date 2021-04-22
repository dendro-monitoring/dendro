import store from '../../store';
import listTablesTimestream from "../timestream/listTables";

import { AWS_TIMESTREAM_DATABASE_NAME } from '../../constants';

/**
 * Lists all the tables located in the database defined by `store.AWS.Timestream.DatabaseName`
 * ```
 * console.log(await orchestrator.listTables());
 * ```
 * @returns Promise<any>
 */
export default async function listTables(DatabaseName: string = AWS_TIMESTREAM_DATABASE_NAME): Promise<any> {
  return new Promise(async resolve => {
    let results: Array<any> = [];
    do {
      const result = await listTablesTimestream(DatabaseName);
      results = [...results, ...result.Tables];
    } while (store.AWS.Timestream.NextToken);

    resolve(results);
  });
}
