import { useEffect, useState } from 'react';
import ChartCard from '../ChartCard';
import { VictoryChart, VictoryTheme, VictoryLine, VictoryLabel, VictoryAxis } from 'victory';
import generateGaussianData from '../../../utils/sampleData';

const load15 = 'select host, measure_value::double, time from "DendroTimestreamDB"."hostMetrics" \
where measure_name = \'load15\' \
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

  let interval = 60 * 60 * 5;
  let mean= 2;
  let variance = 8;

  const sampleLoadData = generateGaussianData(interval, mean, variance).filter( (record: any) => record.y >= 1 && record.y <= 10);

  interval = 60 * 60 * 3;
  mean= 35;
  variance = 8;

  const sampleCPUData = generateGaussianData(interval, mean, variance);

  interval = 60 * 60 * 12;
  mean= 2;
  variance = 1;

  const sampleHostData = generateGaussianData(interval, mean, variance).filter( (record: any) => record.y > 0);

  useEffect(() => {
    // fetch('/api/query', { method: 'POST', body: JSON.stringify({ query: load15 }) }).then( res => res.json()).then( ({ data }) => {
    //   const results = {};
    //   data?.Rows?.forEach( ({ Data }: any) => {
    //     if (!results[Data[0].ScalarValue]) results[Data[0].ScalarValue] = [];
    //     results[Data[0].ScalarValue].push({ x: new Date(Data[2].ScalarValue).valueOf(), y: Number(Data[1].ScalarValue) || 0 });
    //   });
    //   setLoad15Data(Object.keys(results).map( key => results[key]));
    // }).catch( err => console.log(err));

    // fetch('/api/query', { method: 'POST', body: JSON.stringify({ query: utilization }) }).then(data => data.json()).then( ( { data: Rows } ) => {
    //   const results = {};
    //   Rows.Rows.forEach( ({ Data }) => {
    //     if (!results[Data[0].ScalarValue]) results[Data[0].ScalarValue] = [];
    //     results[Data[0].ScalarValue].push( { x: new Date(Data[1].ScalarValue).valueOf(), y: Number(Data[2].ScalarValue) });
    //   });
    //   setUtilizationData(Object.keys(results).map( key => results[key]));
    // }).catch( err => console.log(err));

    // fetch('/api/query', { method: 'POST', body: JSON.stringify({ query: userCount }) }).then(data => data.json()).then( ( { data: Rows } ) => {
    //   const results = [];
    //   Rows.Rows.forEach( ({ Data }) => {
    //     results.push( { x: new Date(Data[0].ScalarValue).valueOf(), y: Number(Data[1].ScalarValue) });
    //   });
    //   setUserCountData(results);
    // }).catch( err => console.log(err));
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
              {/* {load15Data.map( temp => ( */}
              <VictoryLine
                style={{
                  data: { stroke: '#EF4444' },
                  parent: { border: '1px solid #9CA3AF' }
                }}
                data={sampleLoadData}
                // data={temp}
                key={sampleLoadData}
              />
              {/* ))} */}
              <VictoryAxis
                tickFormat={t => `${t.getUTCMonth() + 1}/${t.getUTCDate()}`}
              />
              <VictoryAxis dependentAxis />
            </VictoryChart>
            <VictoryChart
              scale={{ x: 'time', y: 'linear' }}
              style={{ parent: { maxWidth: '50%', } }}
              theme={VictoryTheme.material}
              key="utilization"
            >
              <VictoryLabel text={'CPU Utilization'} x={180} y={30} textAnchor="middle"/>
              {/* {load15Data.map( temp => ( */}
              <VictoryLine
                style={{
                  data: { stroke: '#EF4444' },
                  parent: { border: '1px solid #9CA3AF' }
                }}
                data={sampleCPUData}
                // data={temp}
              />
              {/* ))} */}
              <VictoryAxis
                tickFormat={t => `${t.getUTCMonth() + 1}/${t.getUTCDate()}`}
              />
              <VictoryAxis dependentAxis />
            </VictoryChart>
            <VictoryChart
              scale={{ x: 'time', y: 'linear' }}
              style={{ parent: { maxWidth: '50%', } }}
              theme={VictoryTheme.material}
              key="hosts"
            >
              <VictoryLabel text={'Unique machines monitored'} x={180} y={30} textAnchor="middle"/>
              {/* {load15Data.map( temp => ( */}
              <VictoryLine
                style={{
                  data: { stroke: '#EF4444' },
                  parent: { border: '1px solid #9CA3AF' }
                }}
                data={sampleHostData}
                // data={temp}
                key={sampleHostData}
              />
              {/* ))} */}
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
