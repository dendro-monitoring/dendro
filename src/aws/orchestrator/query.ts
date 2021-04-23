import store from '../../store';
import timestreamQuery from '../timestream/query';

export interface queryResults {
  ColumnInfo?: {Name: string, Type: Record<string, unknown>[]}
  Rows: Array<{ Data: Array<any>}>
}

export default function query(QueryString: string): Promise<queryResults> {
  return new Promise(async (resolve, reject) => {
    const results: queryResults = { Rows: [] };
    do {
      try {
        const result = await timestreamQuery(QueryString);
        results.ColumnInfo = result.ColumnInfo;
        results.Rows = [...results.Rows, ...result.Rows];
      } catch (e) {
        reject(e);
        return;
      }
    } while (store.AWS.Timestream.NextToken);

    resolve(results);
  });
}
