import store from '../../store';
import listTablesTimestream from "../timestream/listTables";

/**
 * Lists all the tables located in the database defined by `store.AWS.Timestream.DatabaseName` 
 * ```
 * console.log(await orchestrator.listTables());
 * ```
 * @returns Promise<any>
 */
export default function listTables(): Promise<any> {
  return new Promise(async resolve => {
    let results: Array<any> = [];
    do {
      const result = await listTablesTimestream();
      results = [...results, ...result.Tables];
    }  while (store.AWS.Timestream.NextToken);
    resolve(results);
  }); 
}
