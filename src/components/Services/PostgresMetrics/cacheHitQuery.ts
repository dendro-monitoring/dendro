const Series = require('time-series-data-generator');
import { Dispatch, SetStateAction } from 'react';
import formatTSQueryResult from '../formatTSQueryResult';

const cacheBlocksHitQuery = 'SELECT concat(host, \'-\', database) AS source, time AS x, measure_value::double AS y \
  FROM DendroTimestreamDB.postgresMetrics \
  WHERE measure_name = \'pg_stat_database_blks_hit_total\' \
  AND database IS NOT NULL \
  AND database = \'postgres\' \
  AND time >= ago(8h) \
  GROUP BY measure_name, measure_value::double, time, host, database \
  ORDER BY time ASC';

const readBlocksHitQuery = 'SELECT concat(host, \'-\', database) AS source, time AS x, measure_value::double AS y \
  FROM DendroTimestreamDB.postgresMetrics \
  WHERE measure_name = \'pg_stat_database_blks_read_total\' \
  AND database IS NOT NULL \
  AND database = \'postgres\' \
  AND time >= ago(8h) \
  GROUP BY measure_name, measure_value::double, time, host, database \
  ORDER BY time ASC';

// currently not working -- should combine the above queries plus calculations
const cacheHitRatioQuery = 'SELECT concat(host, \'-\', database) AS source, time AS x, measure_value::double - lag(measure_value::double) OVER (PARTITION BY host, database ORDER BY time) AS y \
  FROM DendroTimestreamDB.postgresMetrics \
  WHERE measure_name = \'pg_stat_database_blks_read_total\' \
  AND database IS NOT NULL \
  AND database = \'postgres\' \
  AND time >= ago(2h) \
  GROUP BY measure_name, measure_value::double, time, host, database \
  ORDER BY time ASC';

export default function getCacheHitData() {
  const d = new Date();
  const until = new Date(Date.now()).toISOString(); // today
  const from = new Date(d.setDate(d.getDate() - 7)).toISOString(); // a week ago
  const interval = 15;
  const keyName = 'y';
  const cacheHitSeries = new Series({ from, until, interval, keyName, type: 'random' });
  const cacheHitWeights = {
    '.99': 100,
    '.98': 10,
    '.985': 20,
    '.97': 3,
    '.965': 1,
  };

  const fakeData = (() => {
    let newData: any = [];
    for (let count = 1; count <= 50; count++) {
      newData = newData.concat(cacheHitSeries.ratio(cacheHitWeights).map((record: any) => {
        const newRecord: Record<'x'|'y', number | undefined> = {
          x: undefined,
          y: undefined,
        };

        newRecord.x = new Date(record.timestamp).valueOf();
        newRecord.y = Number(record.y);
        return newRecord;
      }));
    }
    return newData;
  }
  )();

  return fakeData;

  // First query

  // (async () => {
  //   const res = await fetch(
  //     '/api/query',
  //     {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         query: cacheBlocksHitQuery
  //       })
  //     }
  //   );

  //   const { data: fetchedData } = await res.json();
  //   const formattedResult = formatTSQueryResult(fetchedData);
  //   setCacheHitData(formattedResult.map((entry: any) => {
  //     entry.y = Number(entry.y) || 0;
  //     entry.x = new Date(entry.x).valueOf();
  //     return entry;
  //   }));
  // })();

  // (async () => {
  //   const res = await fetch(
  //     '/api/query',
  //     {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         query: readBlocksHitQuery
  //       })
  //     }
  //   );

  //   const { data: fetchedData } = await res.json();
  //   const formattedResult = formatTSQueryResult(fetchedData);
  //   setReadHitData(formattedResult.map((entry: any) => {
  //     entry.y = Number(entry.y) || 0;
  //     entry.x = new Date(entry.x).valueOf();
  //     return entry;
  //   }));
  // })();

  // // performs the calculation for the cache hit ratio
  // (async () => {
  //   let ratioData = readHitData.map((entry, idx) => {
  //     entry.y = cacheHitData[idx].y / (cacheHitData[idx].y + entry.y);
  //     return entry;
  //   })
  //   setcacheHitRatioData(ratioData);
  // })()
}
