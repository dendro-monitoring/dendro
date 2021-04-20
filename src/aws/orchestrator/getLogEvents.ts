import store from '../../store';
import getEvents from '../cloudwatch/getLogEvents';

export default function getLogEvents(): Promise<any>{
  return new Promise(async resolve => {
    let results: Array<any> = [];
    do {
      const { events } = await getEvents('/aws/lambda/DendroTestS3ToTimestream', '2021/04/13/[$LATEST]b61150ae86bd4fce959156adce82f3fb');

      results = [...results, ...events];
    } while (store.AWS.Cloudwatch.NextToken);
    
    resolve(results);
  });
}
