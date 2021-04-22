import * as AWS from "../";

export default function deleteTimestream(): Promise<any> {
  return new Promise(resolve => {
    const tables = AWS.listTables();
  });
}
