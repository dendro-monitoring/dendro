import store from '../../store';
import listTablesTimestream from "../timestream/listTables";
import * as AWS from 'aws-sdk';

import { AWS_TIMESTREAM_DATABASE_NAME } from '../../constants';

/**
 * Lists all the tables located in the database defined by `store.AWS.Timestream.DatabaseName`
 * ```
 * console.log(await orchestrator.listTables());
 * ```
 * @returns Promise<any>
 */
export default async function listTables(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    let results: Array<any> = [];
    do {
      try {
        const result = await listTablesTimestream();
        results = [...results, ...result.Tables];
      } catch (e) {
        reject(e);
      }

    } while (store.AWS.Timestream.NextToken);

    resolve(results);
  });
}
