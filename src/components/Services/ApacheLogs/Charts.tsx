import { useEffect, useState } from 'react';
import ChartCard from '../ChartCard';
import { VictoryChart, VictoryLine, VictoryBar, VictoryArea, VictoryStack, VictoryLabel, VictoryLegend, VictoryAxis } from 'victory';
import formatTSQueryResult from '../formatTSQueryResult';
const Series = require('time-series-data-generator');

function generateGaussianData(interval: number, mean: number, variance: number) {
  const d = new Date();
  const until = new Date(Date.now()).toISOString(); // today
  const from = new Date(d.setDate(d.getDate() - 7)).toISOString(); // a week ago
  const keyName = 'y';
  const series = new Series({ from, until, interval, keyName });

  const data = series.gaussian({ mean, variance }).map((record: any) => {
    const newRecord: Record<'x'|'y', number | undefined> = {
      x: undefined,
      y: undefined,
    };

    newRecord.x = new Date(record.timestamp).valueOf(); // convert ISO string to a date and get UNIX time
    newRecord.y = record.y;
    return newRecord;
  });

  return data;
}

function loadRpsData(setterFunc: any) {
  const interval = 60 * 60;
  const mean= 250;
  const variance = 75;

  const data = generateGaussianData(interval, mean, variance);
  setterFunc(data);

  // (async () => {
  //   const res = await fetch(
  //     '/api/query',
  //     {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         query: 'SELECT BIN(time, 900s) AS x, COUNT(*) AS y \
  //                FROM DendroTimestreamDB.apacheAccessLogs \
  //                WHERE time > ago(168h) \
  //                GROUP BY BIN(time, 900s), ip \
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
  const interval = 3 * 60 * 60;
  const mean = .200;
  const variance = .03;

  const data = generateGaussianData(interval, mean, variance);
  setterFunc(data);

  // (async () => {
  //   const res = await fetch(
  //     '/api/query',
  //     {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         query: 'SELECT host, BIN(time, 900s) as interval_15m, \
  //                   ROUND(AVG(CAST(request_time AS double)), 2) AS avg_request_time, \
  //                   ROUND(APPROX_PERCENTILE(CAST(request_time AS double), 0.9), 2) AS p90_request_time, \
  //                   ROUND(APPROX_PERCENTILE(CAST(request_time AS double), 0.95), 2) AS p95_request_time, \
  //                   ROUND(APPROX_PERCENTILE(CAST(request_time AS double), 0.99), 2) AS p99_request_time \
  //                 FROM DendroTimestreamDB.apacheAccessLogs \
  //                 WHERE time > ago(168h) \
  //                 GROUP BY host, BIN(time, 900s) \
  //                 ORDER BY BIN(time, 900s) ASC'
  //       })
  //     }
  //   );

  //   const { data: fetchedData } = await res.json();
  //   const formattedResult = formatTSQueryResult(fetchedData);
  //   setterFunc(formattedResult);
  // })();
}

function loadStatusCodeData(setterFunc: any) {
  const data200 = generateGaussianData(60 * 60, 400, 60);
  const data400 = generateGaussianData(60 * 60, 50, 25);
  const data500 = generateGaussianData(60 * 60, 30, 10);

  setterFunc([data200, data400, data500]);
  // (async () => {
  //   const res = await fetch(
  //     '/api/query',
  //     {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         query: "SELECT host, BIN(time, 900s) as interval_15m, \
  //                   COUNT(CASE WHEN measure_value::varchar LIKE '2%' then 1 ELSE NULL END) as r2xx, \
  //                   COUNT(CASE WHEN measure_value::varchar LIKE '4%' then 1 ELSE NULL END) as r4xx, \
  //                   COUNT(CASE WHEN measure_value::varchar LIKE '5%' then 1 ELSE NULL END) as r5xx \
  //                 FROM DendroTimestreamDB.apacheAccessLogs \
  //                 WHERE time > ago(168h) \
  //                 GROUP BY host, BIN(time, 900s) \
  //                 ORDER BY BIN(time, 900s) ASC"
  //       })
  //     }
  //   );

  //   const { data: fetchedData } = await res.json();
  //   const formattedResult = formatTSQueryResult(fetchedData);
  //   setterFunc(formattedResult);
  // })();
}

export default function Chart({ name }: { name: string }) {
  const [rpsData, setRpsData] = useState([]);               // single array
  const [latencyData, setLatencyData] = useState([]);       // this will have 4 sub-array elements
  const [statusCodeData, setStatusCodeData] = useState([]); // 3 sub arrays: 200 level, 400 level, 500 level

  useEffect(() => {
    loadRpsData(setRpsData);
    loadLatencyData(setLatencyData);
    loadStatusCodeData(setStatusCodeData);
  }, []);

  return (
    <>
      <h1 className="text-3xl font-semibold" id='apacheAccessLogs'>{name}</h1>
      <ChartCard name={name}>
        {/* Child 1 */}
        <>
          {/* Chart 1 */}
          <VictoryChart
            style={{ parent: { maxWidth: '50%', } }}
            scale={{ x: 'time', y: 'linear' }}
            domain={{ y: [0, 600] }}
            key='rps'
          >
            <VictoryLabel text="Requests per Second (past 7 days)" x={240} y={30} textAnchor="middle"/>
            <VictoryLine
              style={{ data: { stroke: '#98DED9' }, parent: { border: '1px solid #ccc' } }}
              data={rpsData}
            />
            <VictoryAxis
              tickFormat={t => `${t.getUTCMonth() + 1}/${t.getUTCDate()}`}
              style={{ tickLabels: { fontSize: 12, padding: 5 } }}
            />
            <VictoryAxis dependentAxis style={{ tickLabels: { fontSize: 12, padding: 5 } }} />
          </VictoryChart>

          {/* Chart 2 */}
          <VictoryChart
            style={{ parent: { maxWidth: '50%', } }}
            scale={{ x: 'time', y: 'linear' }}
            domain={{ y: [0, 1] }}
            key='latency'
          >
            <VictoryLabel text={'Avg. HTTP Response Time (s)'} x={240} y={30} textAnchor="middle"/>
            <VictoryLine
              style={{
                data: { stroke: '#98DED9' },
                parent: { border: '1px solid #9CA3AF' }
              }}
              data={latencyData}
            />
            <VictoryAxis
              tickFormat={t => `${t.getUTCMonth() + 1}/${t.getUTCDate()}`}
              style={{ tickLabels: { fontSize: 12, padding: 5 } }}
            />
            <VictoryAxis dependentAxis style={{ tickLabels: { fontSize: 12, padding: 5 } }} />
          </VictoryChart>
        </>

        {/* Child 2 */}
        <>
          {/* Chart 3 */}
          <VictoryChart
            style={{ parent: { maxWidth: '50%', } }}
            domainPadding={{ x: 10 }}
            key='slowest'
          >
            <VictoryLabel text={'Slowest Paths (s)'} x={240} y={30} textAnchor="middle"/>
            <VictoryBar horizontal
              style={{ data: { fill: '#161D6F' } }}
              labels={({ datum }) => `  ${datum.y}s`}
              data={ [
                { x: '/home', y: .2 },
                { x: '/dash', y: .5 },
                { x: '/index', y: .8 },
                { x: '/find', y: 1.3 },
                { x: '/api', y: 1.8 },
              ] }
            />
          </VictoryChart>

          {/* Chart 4 */}
          <VictoryChart
            style={{ parent: { maxWidth: '50%', } }}
            scale={{ x: 'time', y: 'linear' }}
            domain={{ y: [0, 800] }}
            key='status'
          >
            <VictoryLabel text={'Status Code Responses (Avg. Count)'} x={240} y={30} textAnchor="middle"/>
            <VictoryLegend x={380} y={20}
              orientation="vertical"
              rowGutter={{ top: 0, bottom: -15 }}
              data={[
                { name: '2xx', symbol: { fill: '#161D6F' } },
                { name: '4xx', symbol: { fill: '#904E55' } },
                { name: '5xx', symbol: { fill: '#98DED9' } }
              ]}
            />

            {/* <VictoryStack colorScale={['#161D6F', '#c7ffd8', '#98DED9']} >
              <VictoryArea data={statusCodeData[0]} />
              <VictoryArea data={statusCodeData[1]} />
              <VictoryArea data={statusCodeData[2]} />
            </VictoryStack> */}

            <VictoryLine
              data={statusCodeData[0]}
              style={{ data: { stroke: '#161D6F' } }}
            />
            <VictoryLine
              data={statusCodeData[1]}
              style={{ data: { stroke: '#904E55' } }}
            />
            <VictoryLine
              data={statusCodeData[2]}
              style={{ data: { stroke: '#98DED9' } }}
            />

            <VictoryAxis
              tickFormat={t => `${t.getUTCMonth() + 1}/${t.getUTCDate()}`}
              style={{ tickLabels: { fontSize: 12, padding: 5 } }}
            />
            <VictoryAxis dependentAxis style={{ tickLabels: { fontSize: 12, padding: 5 } }} />
          </VictoryChart>
        </>
      </ChartCard>
    </>
  );
}
