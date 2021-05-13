const Series = require('time-series-data-generator');
import { Dispatch, SetStateAction } from 'react';
import formatTSQueryResult from '../formatTSQueryResult';

const queuedOperationsQuery = 'SELECT host AS source, time AS x, measure_value::double AS y \
  FROM DendroTimestreamDB.mongoMetrics \
  WHERE measure_name = \'mongod_global_lock_current_queue\' \
  GROUP BY measure_name, measure_value::double, time, host \
  ORDER BY time ASC';

export default function getQueuedOperationsData() {
  const d = new Date();
  const until = new Date(Date.now()).toISOString(); // today
  const from = new Date(d.setDate(d.getDate() - 7)).toISOString(); // a week ago
  const interval = 5000;
  const keyName = 'y';
  const series = new Series({ from, until, interval, keyName });
  const mean = 500;
  const variance = 3;
  const decimalDigits = 3;
  const fakeData = series.gaussian({ mean, variance, decimalDigits }).map((record: any) => {
    const newRecord: Record<'x'|'y', number | undefined> = {
      x: undefined,
      y: undefined,
    };

    newRecord.x = new Date(record.timestamp).valueOf();
    newRecord.y = Number(record.y);
    return newRecord;
  });
  return fakeData;

}
