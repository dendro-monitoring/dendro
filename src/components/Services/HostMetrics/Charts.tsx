import { useEffect, useState } from 'react';
import ChartCard from '../ChartCard';
import { VictoryChart, VictoryTheme, VictoryLine, VictoryLabel } from 'victory';

const query = 'SELECT time as x, measure_value::double - lag(measure_value::double) OVER (PARTITION BY host, cpuMode ORDER BY time) AS y \
FROM DendroTimestreamDB.hostMetrics \
WHERE measure_name = \'cpu_seconds_total\' \
and cpuMode = \'user\' \
GROUP BY measure_name, measure_value::double, time, host, cpuMode \
ORDER BY time ASC \
limit 500';

const query2 = 'select host, measure_value::double, time from "DendroTimestreamDB"."hostMetrics" \
where measure_name = \'load15\' \
--group by host \
limit 500';
export default function Chart() {
  const [queryData, setQueryData] = useState([]);
  const name = 'angel';

  useEffect(() => {
    fetch('/api/query', { method: 'POST', body: JSON.stringify({ query: query2 }) }).then( res => res.json()).then( ({ data }) => {
      const results = {};
      data?.Rows?.forEach( ({ Data }: any) => {
        if (!results[Data[0].ScalarValue]) results[Data[0].ScalarValue] = [];
        results[Data[0].ScalarValue].push({ x: new Date(Data[2].ScalarValue).valueOf(), y: Number(Data[1].ScalarValue) || 0 });
      });
      setQueryData(Object.keys(results).map( key => results[key]));
    });
  }, []);

  console.log(queryData);

  return (
    <>
      <h1 className="text-3xl font-semibold">{name}</h1>
      <ChartCard name={name}>
        <VictoryChart
          scale={{ x: 'time', y: 'linear' }}
          style={{ parent: { maxWidth: '50%', } }}
          theme={VictoryTheme.material}
        >
          <VictoryLabel text={'Load15'} x={180} y={30} textAnchor="middle"/>
          {queryData.map( temp => (
            <VictoryLine
              style={{
                data: { stroke: '#EF4444' },
                parent: { border: '1px solid #9CA3AF' }
              }}
              data={temp}
              key={temp}
            />
          ))}
        </VictoryChart>
        <></>
      </ChartCard>
    </>
  );
}
