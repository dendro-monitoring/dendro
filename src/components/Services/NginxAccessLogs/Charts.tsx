// import remap func
import { useEffect, useState } from 'react';
import { ChartDataPoint } from '../../../constants/frontendTypes';
import ChartCard from '../ChartCard';
import { VictoryChart, VictoryLine, VictoryLabel, VictoryAxis, VictoryTheme } from 'victory';
import formatTSQueryResult from '../formatTSQueryResult';
const Series = require('time-series-data-generator');

function loadRpsData(setterFunc: any) {
  const d = new Date();
  const until = new Date(Date.now()).toISOString(); // today
  const from = new Date(d.setDate(d.getDate() - 7)).toISOString(); // a week ago
  const interval = 1 * 60 * 60; // hours, minutes, seconds
  const keyName = 'y';
  const series = new Series({ from, until, interval, keyName });

  const data = series.gaussian({ mean: 250, variance: 85 }).map((record: any) => {
    const newRecord = {};
    newRecord.x = new Date(record.timestamp).valueOf(); // convert ISO string to a date and get UNIX time
    newRecord.y = record.y;
    return newRecord;
  });

  setterFunc(data);

  // (async () => {
  //   const res = await fetch(
  //     '/api/query',
  //     {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         query: 'SELECT BIN(time, 1s) AS x, COUNT(*) AS y \
  //                FROM DendroTimestreamDB.nginxAccessLogs \
  //                WHERE time > ago(168h) \
  //                GROUP BY BIN(time, 1s), ip \
  //                ORDER BY x ASC'
  //       })
  //     }
  //   );

  //   const { data: fetchedData } = await res.json();
  //   const formattedResult = formatTSQueryResult(fetchedData);
  //   setterFunc(formattedResult);
  // })();
}

function loadLatencyData(setterFunc: any) {
  const d = new Date();
  const until = new Date(Date.now()).toISOString(); // today
  const from = new Date(d.setDate(d.getDate() - 7)).toISOString(); // a week ago
  const interval = 7 * 24 * 60 * 60 ; // hours * minutes * seconds
  const keyName = 'y';
  const series = new Series({ from, until, interval, keyName });
  const data = series.gaussian({ mean: 300, variance: 75 }).map((record: any) => {
    const newRecord = {};
    newRecord.x = new Date(record.timestamp).valueOf(); // convert ISO string to a date and get UNIX time
    newRecord.y = record.y;
    return newRecord;
  });

  // (async () => {
  //   const res = await fetch(
  //     '/api/query',
  //     {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         query: 'SELECT host, BIN(time, 30s) \
  //                   ROUND(AVG(CAST(request_time AS double)), 2) AS avg_request_time, \
  //                   ROUND(APPROX_PERCENTILE(CAST(request_time AS double), 0.9), 2) AS p90_request_time, \
  //                   ROUND(APPROX_PERCENTILE(CAST(request_time AS double), 0.95), 2) AS p95_request_time, \
  //                   ROUND(APPROX_PERCENTILE(CAST(request_time AS double), 0.99), 2) AS p99_request_time \
  //                 FROM DendroTimestreamDB.nginxAccessLogs \
  //                 WHERE time > ago(168h) \
  //                 GROUP BY host, BIN(time, 30s) \
  //                 ORDER BY BIN(time, 30s) ASC'
  //       })
  //     }
  //   );

  //   const { data: fetchedData } = await res.json();
  //   const formattedResult = formatTSQueryResult(fetchedData);
  //   setterFunc(formattedResult);
  // })();
}

export default function Chart({ name }: { name: string }) {
  const [rpsData, setRpsData] = useState([]);         // single array
  const [latencyData, setLatencyData] = useState([]); // this will have 4 sub-array elements

  useEffect(() => {
    loadRpsData(setRpsData);
    loadLatencyData(setLatencyData);
  }, []);

  return (
    <>
      <h1 className="text-3xl font-semibold">{name}</h1>
      <ChartCard name={name}>
        {/* Child 1 */}
        <>
          {/* Chart 1 */}
          <VictoryChart
            style={{ parent: { maxWidth: '50%', } }}
            // theme={VictoryTheme.material}
            scale={{ x: 'time', y: 'linear' }}
            domain={{ y: [0, 600] }}
            key='rps'
          >
            <VictoryLabel text="Requests per Second (past 7 days)" x={230} y={30} textAnchor="middle"/>
            <VictoryLine
              style={{ data: { stroke: '#8dd9d4' }, parent: { border: '1px solid #ccc' } }}
              data={rpsData}
            />
            <VictoryAxis
              tickFormat={t => `${t.getUTCMonth() + 1}/${t.getUTCDate()}`}
              style={{ tickLabels: { fontSize: 12, padding: 5 } }}
            />
            <VictoryAxis dependentAxis
              style={{ tickLabels: { fontSize: 12, padding: 5 } }}
            />
          </VictoryChart>

          {/* Chart 2 */}
          <VictoryChart
            style={{ parent: { maxWidth: '50%', } }}
            // theme={VictoryTheme.material}
            key='latency'
          >
            <VictoryLabel text={'Avg. HTTP Response Time (ms)'} x={230} y={30} textAnchor="middle"/>
            <VictoryLine
              style={{
                data: { stroke: '#EF4444' },
                parent: { border: '1px solid #9CA3AF' }
              }}
              data={latencyData}
            />
          </VictoryChart>
        </>

        {/* Child 2 */}
        <>
          {/* Chart 3 */}
          <VictoryChart
            style={{ parent: { maxWidth: '50%', } }}
            // theme={VictoryTheme.material}
            key='slowest'
          >
            <VictoryLabel text={'Slowest Paths (ms)'} x={230} y={30} textAnchor="middle"/>
            <VictoryLine
              style={{
                data: { stroke: '#EF4444' },
                parent: { border: '1px solid #9CA3AF' }
              }}
            // data={chartData1}
            />
          </VictoryChart>

          {/* Chart 4 */}
          <VictoryChart
            style={{ parent: { maxWidth: '50%', } }}
            // theme={VictoryTheme.material}
            key='status'
          >
            <VictoryLabel text={'Status Code Responses'} x={240} y={30} textAnchor="middle"/>
            <VictoryLine
              style={{
                data: { stroke: '#EF4444' },
                parent: { border: '1px solid #9CA3AF' }
              }}
            // data={chartData1}
            />
          </VictoryChart>
        </>
      </ChartCard>
    </>
  );
}

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

