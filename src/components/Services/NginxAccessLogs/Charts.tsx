// import remap func
import { useEffect, useState } from 'react';
import { VictoryChart, VictoryLine, VictoryLabel, VictoryAxis, VictoryTheme } from 'victory';
import formatTSQueryResult from '../formatTSQueryResult';
const Series = require('time-series-data-generator');

export default function Chart() {
  const [rpsData, setRpsData] = useState([]);
  useEffect(() => {
    // First query
    // (async () => {
    //   const res = await fetch(
    //     '/api/query',
    //     {
    //       method: 'POST',
    //       body: JSON.stringify({
    //         query: 'SELECT BIN(time, 1s) AS x, COUNT(*) AS y \
    //                FROM DendroTimestreamDB.nginxAccessLogs \
    //                GROUP BY BIN(time, 1s) \
    //                ORDER BY x ASC'
    //       })
    //     }
    //   );

    //   const { data: fetchedData } = await res.json();
    //   const formattedResult = formatTSQueryResult(fetchedData);
    //   setRpsData(formattedResult);
    // })();

    const d = new Date();
    const until = new Date(Date.now()).toISOString(); // today
    const from = new Date(d.setDate(d.getDate() - 7)).toISOString(); // a week ago

    const interval = 15 * 60;
    const keyName = 'y';
    const series = new Series({ from, until, interval, keyName });

    const mean = 300;
    const variance = 75;

    const data = series.gaussian({ mean, variance }).map(record => {
      const newRecord = {};
      newRecord.x = record.timestamp;
      newRecord.y = record.y;
      return newRecord;
    });

    // convert ISO string to a date and get the number of milliseconds since epoch (to chart continuously)
    const remappedData = data.map(record => {
      record.x = new Date(record.x).valueOf();
      return record;
    });

    setRpsData(remappedData);
  }, []);

  return <>
    <VictoryChart
      style={{ parent:{ maxWidth: '50%', } }}
      theme={VictoryTheme.material}
      scale={{ x: 'time', y: 'linear' }}
      domain={{ y: [0, 800] }}
    >
      <VictoryLabel text="Requests per Second (past 7 days)" x={185} y={30} textAnchor="middle"/>
      <VictoryLine
        style={{
          data: { stroke: '#c43a31' },
          parent: { border: '1px solid #ccc' }
        }}
        data={rpsData}
      />
      <VictoryAxis
        tickFormat={t => `${t.getUTCMonth() + 1}/${t.getUTCDate()}`}
      />
      <VictoryAxis dependentAxis />
    </VictoryChart>
  </>;

  // SECOND QUERY
  // (async () => {
  //   const res = await fetch(
  //     '/api/query',
  //     { method: 'POST', body: JSON.stringify({ query: 'SELECT * FROM DendroTimestreamDB.postgres-metrics LIMIT 10' }) }
  //   );

  //   const { data: fetchedData } = await res.json();
  //   setData(fetchedData);
  // })();

  // THIRD QUERY
  // (async () => {
  //   const res = await fetch(
  //     '/api/query',
  //     { method: 'POST', body: JSON.stringify({ query: 'SELECT * FROM DendroTimestreamDB.postgres-metrics LIMIT 10' }) }
  //   );

  //   const { data: fetchedData } = await res.json();
  //   setData(fetchedData);
  // })();

  // FOURTH QUERY
  // (async () => {
  //   const res = await fetch(
  //     '/api/query',
  //     { method: 'POST', body: JSON.stringify({ query: 'SELECT * FROM DendroTimestreamDB.postgres-metrics LIMIT 10' }) }
  //   );

  //   const { data: fetchedData } = await res.json();
  //   setData(fetchedData);
  // })();
}
