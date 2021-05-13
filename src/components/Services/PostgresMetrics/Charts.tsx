import { ChartDataPoint } from '../../../constants/frontendTypes';
import ChartCard from '../ChartCard';
import { VictoryChart, VictoryTheme, VictoryLine, VictoryLabel, VictoryAxis } from 'victory';
import { useEffect, useState } from 'react';
import getConnectionsData from './connectionsQuery';
import getCacheHitData from './cacheHitQuery';

export default function Chart({ name }: { name: string }) {
  const [cacheHitRatioData, setCacheHitRatioData] = useState([]);
  const [connectionsData, setConnectionsData] = useState([]);

  useEffect(() => {
    setCacheHitRatioData(getCacheHitData);
    setConnectionsData(getConnectionsData);
  }, []);

  return (
    <>

      <h1 className="text-3xl font-semibold" id='postgresLogs'>{name}</h1>
      <ChartCard name={name}>
        {/* Child 1 */}
        <>
          {/* Chart 1 */}
          <VictoryChart
            scale={{ x: 'time', y: 'linear' }}
            style={{ parent: { maxWidth: '50%', } }}
            // theme={VictoryTheme.material}
            domain={{ y: [0.9, 1] }}
          >
            <VictoryLabel text={'Cache Hit Ratio'} x={240} y={30} textAnchor='middle' />
            <VictoryLine
              style={{
                data: { stroke: '#1144F1' },
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
            scale={{ x: 'time', y: 'linear' }}
            style={{ parent: { maxWidth: '50%', } }}
            domain={{ y: [80, 120] }}
          >
            <VictoryLabel text={'Number of Connections'} x={240} y={30} textAnchor='middle' />
            <VictoryLine
              style={{
                data: { stroke: '#1144F1' },
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
