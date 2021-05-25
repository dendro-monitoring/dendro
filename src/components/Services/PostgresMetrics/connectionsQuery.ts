const Series = require('time-series-data-generator');
import { Dispatch, SetStateAction } from 'react';
import formatTSQueryResult from '../formatTSQueryResult';

const connectionsQuery = 'SELECT concat(host, \'-\', database) AS source, time AS x, measure_value::double AS y \
  FROM DendroTimestreamDB.postgresMetrics \
  WHERE measure_name = \'pg_stat_database_numbackends\' \
  AND database IS NOT NULL \
  AND database = \'postgres\' \
  GROUP BY measure_name, measure_value::double, time, host, database \
  ORDER BY time ASC';

export default function getConnectionsData() {
  const d = new Date();
  const until = new Date(Date.now()).toISOString(); // today
  const from = new Date(d.setDate(d.getDate() - 7)).toISOString(); // a week ago
  const interval = 10000;
  const keyName = 'y';
  const series = new Series({ from, until, interval, keyName });
  const mean = 100;
  const variance = 5.3;
  const decimalDigits = 3;

  const fakeData = series.gaussian({ mean, variance, decimalDigits }).map((record: any) => {
    const newRecord: Record<'x'|'y', number | undefined> = {
      x: undefined,
      y: undefined,
    };

    newRecord.x = new Date(record.timestamp).valueOf();
    newRecord.y = +(record.y);
    return newRecord;
  });

  return fakeData;

  // const connectionsSeries = new Series({ from, until, interval, keyName, type: "random" });
  // const connectionsWeights = {
  //   100: 50,
  //   125: 10,
  //   115: 10,
  //   105: 10,
  //   95: 20,
  //   130: 3,
  //   120: 1,
  // }
  // setConnectionsData((() => {
  //   let newData: any = [];
  //   for (let count = 1; count <= 50; count++) {
  //     newData = newData.concat(connectionsSeries.ratio(connectionsWeights).map(record => {
  //       const newRecord = {};
  //       newRecord.x = new Date(record.timestamp).valueOf();
  //       newRecord.y = Number(record.y);
  //       return newRecord;
  //     }))
  //   }
  //   return newData;
  // }
  // )());
}
