// import remap func
import { useEffect, useState } from 'react';
import { VictoryChart, VictoryLine, VictoryLabel, VictoryAxis, VictoryTheme } from 'victory';
import formatTSQueryResult from '../formatTSQueryResult';

export default function Chart() {
  const [rpsData, setRpsData] = useState([]);
  // query the db x times
  // remap the queried data
  // display
  useEffect(() => {
    // First query
    (async () => {
      const res = await fetch(
        '/api/query',
        { method: 'POST',
          body: JSON.stringify({
            query: 'SELECT BIN(time, 1s) AS x, COUNT(*) AS y \
                   FROM DendroTimestreamDB.nginxAccessLogs \
                   GROUP BY BIN(time, 1s) \
                   ORDER BY x ASC'
          })
        }
      );

      const { data: fetchedData } = await res.json();
      const formattedResult = formatTSQueryResult(fetchedData);
      setRpsData(formattedResult);
    })();
  }, []);

  console.log(rpsData);

  // return <h1>{ JSON.stringify(rpsData) }</h1>;
  return <>
    <VictoryChart
      theme={VictoryTheme.material}
      scale={{ x: 'time', y: 'linear' }}
    >
      <VictoryLabel text="Requests per Second (past 7 days)" x={185} y={30} textAnchor="middle"/>
      <VictoryLine
        style={{
          data: { stroke: '#c43a31' },
          parent: { border: '1px solid #ccc' }
        }}
        data={rpsData.map(record => record.x = new Date(record.x))}
      />
      <VictoryAxis
        tickValues={rpsData.map(d => new Date(d.x))}
        tickFormat={t => `${t.getUTCMonth() + 1}/${t.getUTCDate()}`}
      />
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
