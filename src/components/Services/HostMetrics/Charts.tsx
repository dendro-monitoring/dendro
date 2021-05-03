import { useEffect, useState } from 'react';
import ChartCard from '../ChartCard';
import { VictoryChart, VictoryTheme, VictoryLine, VictoryLabel, VictoryAxis } from 'victory';
const Series = require('time-series-data-generator');

const load15 = 'select host, measure_value::double, time from "DendroTimestreamDB"."hostMetrics" \
where measure_name = \'load15\' \
--group by host \
limit 500';

const utilization = 'select host, time, (1 - sum(case when cpuMode = \'idle\' and time <= h.time then measure_value::double end) / sum(case when time <= h.time then measure_value::double end)) * 100 as utilization \
from "DendroTimestreamDB"."hostMetrics" h \
where collector = \'cpu\' \
group by host, time \
limit 500';

const userCount = 'select bin(time, 15s), count(distinct host) \
from "DendroTimestreamDB"."hostMetrics" \
group by bin(time, 15s) \
limit 500';

export default function Chart() {
  const [load15Data, setLoad15Data] = useState([]);
  const [utilizationData, setUtilizationData] = useState([]);
  const [userCountData, setUserCountData] = useState([]);
  const name = 'angel';

  // const d = new Date();
  // const until = new Date(Date.now()).toISOString(); // today
  // const from = new Date(d.setDate(d.getDate() - 7)).toISOString(); // a week ago
  // const interval = 15 * 60; // minutes * seconds
  // const interval = 1; // minutes * seconds
  // const keyName = 'y';
  // const series = new Series({ from, until, interval, keyName });
  // const mean = 2.0;
  // const variance = 1.0;
  // const data = series.gaussian({ mean, variance }).map(record => {
  //   const newRecord = {};
  //   newRecord.x = new Date(record.timestamp).valueOf();
  //   // convert ISO string to a date and get the number of milliseconds since epoch (to chart continuously)
  //   newRecord.y = record.y;
  //   return newRecord;
  // });

  useEffect(() => {
    fetch('/api/query', { method: 'POST', body: JSON.stringify({ query: load15 }) }).then( res => res.json()).then( ({ data }) => {
      const results = {};
      data?.Rows?.forEach( ({ Data }: any) => {
        if (!results[Data[0].ScalarValue]) results[Data[0].ScalarValue] = [];
        results[Data[0].ScalarValue].push({ x: new Date(Data[2].ScalarValue).valueOf(), y: Number(Data[1].ScalarValue) || 0 });
      });
      setLoad15Data(Object.keys(results).map( key => results[key]));
    });

    fetch('/api/query', { method: 'POST', body: JSON.stringify({ query: utilization }) }).then(data => data.json()).then( ( { data: Rows } ) => {
      const results = {};
      Rows.Rows.forEach( ({ Data }) => {
        if (!results[Data[0].ScalarValue]) results[Data[0].ScalarValue] = [];
        results[Data[0].ScalarValue].push( { x: new Date(Data[1].ScalarValue).valueOf(), y: Number(Data[2].ScalarValue) });
      });
      setUtilizationData(Object.keys(results).map( key => results[key]));
    });

    fetch('/api/query', { method: 'POST', body: JSON.stringify({ query: userCount }) }).then(data => data.json()).then( ( { data: Rows } ) => {
      const results = [];
      Rows.Rows.forEach( ({ Data }) => {
        results.push( { x: new Date(Data[0].ScalarValue).valueOf(), y: Number(Data[1].ScalarValue) });
      });

      setUserCountData(results);
    });
  }, []);

  return (
    <>
      <ChartCard name={name}>
        {[
          <>
            <VictoryChart
              scale={{ x: 'time', y: 'linear' }}
              style={{ parent: { maxWidth: '50%', } }}
              theme={VictoryTheme.material}
              key="load15"
            >
              <VictoryLabel text={'Load averaged over the last 15 seconds'} x={180} y={30} textAnchor="middle"/>
              {load15Data.map( temp => (
                <VictoryLine
                  style={{
                    data: { stroke: '#EF4444' },
                    parent: { border: '1px solid #9CA3AF' }
                  }}
                  data={temp}
                  key={temp}
                />
              ))}
              <VictoryAxis
                tickFormat={t => `${t.getUTCMonth() + 1}/${t.getUTCDate()}`}
              />
              <VictoryAxis dependentAxis />
            </VictoryChart>
            <VictoryChart
              scale={{ x: 'time', y: 'linear' }}
              style={{ parent: { maxWidth: '50%', } }}
              theme={VictoryTheme.material}
              domain={{ y: [0, 100] }}
              key="utilization"
            >
              <VictoryLabel text={'CPU Utilization'} x={180} y={30} textAnchor="middle"/>
              {utilizationData.map( temp => (
                <VictoryLine
                  style={{
                    data: { stroke: '#EF4444' },
                    parent: { border: '1px solid #9CA3AF' }
                  }}
                  data={temp}
                  key={temp}
                />
              ))}
              <VictoryAxis
                tickFormat={t => `${t.getUTCMonth() + 1}/${t.getUTCDate()}`}
              />
              <VictoryAxis dependentAxis />
            </VictoryChart>
            <VictoryChart
              scale={{ x: 'time', y: 'linear' }}
              style={{ parent: { maxWidth: '50%', } }}
              theme={VictoryTheme.material}
              key="userCount"
            >
              <VictoryLabel text={'Unique machines monitored over last 15 seconds'} x={180} y={30} textAnchor="middle"/>
              <VictoryLine
                style={{
                  data: { stroke: '#EF4444' },
                  parent: { border: '1px solid #9CA3AF' }
                }}
                data={userCountData}
              />
              <VictoryAxis
                tickFormat={t => `${t.getUTCMonth() + 1}/${t.getUTCDate()}`}
              />
              <VictoryAxis dependentAxis />
            </VictoryChart>
          </>
        ]}
      </ChartCard>
    </>
  );
}
