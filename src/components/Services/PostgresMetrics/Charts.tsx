import { ChartDataPoint } from '../../../constants/frontendTypes';
import cacheHitQuery from './cacheHitQuery';
import connectionsQuery from './connectionsQuery';
import ChartCard from '../ChartCard';
import { VictoryChart, VictoryTheme, VictoryLine, VictoryLabel, VictoryAxis } from 'victory';
import formatTSQueryResult from '../formatTSQueryResult';
import { useEffect, useState } from 'react';

export default function Chart({ name }: { name: string }) {
  const [cacheHitData, setCacheHitData] = useState([]);
  // const [readHitData, setReadHitData] = useState([]);
  const [cacheHitRatioData, setCacheHitRatioData] = useState([]);
  const [connectionsData, setConnectionsData] = useState([]);

  useEffect(() => {
    cacheHitQuery(setCacheHitRatioData);
    connectionsQuery(setConnectionsData);
  }, []);

  return (
    <>
      <h1 className="text-3xl font-semibold">{name}</h1>
      <ChartCard name={name}>
        {/* Child 1 */}
        <>
          {/* Chart 1 */}
          <VictoryChart
            scale={{ x: "time", y: "linear" }}
            style={{ parent: { maxWidth: '50%', } }}
            // theme={VictoryTheme.material}
            domain={{ y: [0.9, 1] }}
          >
            <VictoryLabel text={'Cache Hit Ratio'} x={180} y={30} textAnchor="middle" />
            <VictoryLine
              style={{
                data: { stroke: '#EF4444' },
                parent: { border: '1px solid #9CA3AF' }
              }}
              data={cacheHitRatioData}
            />
            <VictoryAxis
              // tickCount={10}
              tickFormat={t => `${t.getUTCMonth() + 1}/${t.getUTCDate()}`}
            />
            <VictoryAxis dependentAxis />
          </VictoryChart>

          {/* Chart 2 */}
          <VictoryChart
            scale={{ x: "time", y: "linear" }}
            style={{ parent: { maxWidth: '50%', } }}
            domain={{ y: [75, 140] }}
          >
            <VictoryLabel text={'Number of Connections'} x={180} y={30} textAnchor="middle" />
            <VictoryLine
              style={{
                data: { stroke: '#EF4444' },
                parent: { border: '1px solid #9CA3AF' }
              }}
              data={connectionsData}
            />
            <VictoryAxis
              // tickCount={10}
              tickFormat={t => `${t.getUTCMonth() + 1}/${t.getUTCDate()}`}
            />
            <VictoryAxis dependentAxis />
          </VictoryChart>
        </>

        <>
        </>
      </ChartCard>
    </>
  );
}
