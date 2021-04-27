import getLogs from '../../cloudwatch/getLogEvents';

import store from '../../../store';

export default function getLogEvents(logGroupName: string, logStreamName: string): Promise<any> {
  return new Promise(async (resolve) =>{
    let results: Array<any> = [];
    do {
      const groups: Array<any> = await getLogs(logGroupName, logStreamName) as any;
      results = [...results, ...groups];
    } while (store.AWS.Cloudwatch.NextToken);

    resolve(results);
  });
}
