import { ChartDataPoint } from '../../../constants/frontendTypes';
import ChartCard from '../ChartCard';
import { VictoryChart, VictoryTheme, VictoryLine, VictoryLabel, VictoryAxis } from 'victory';
import { useEffect, useState } from 'react';
import getConnectionsData from './connectionsQuery';
import getQueuedOperationsData from './queuedOperations';

export default function Chart({ name }: { name: string }) {
  const [queuedOperationsData, setqueuedOperationsData] = useState([]);
  const [connectionsData, setConnectionsData] = useState([]);

  useEffect(() => {
    setqueuedOperationsData(getQueuedOperationsData);
    setConnectionsData(getConnectionsData);
  }, []);

  return (
    <>
      <h1 className="text-3xl font-semibold" id='mongoMetrics'>{name}</h1>
      <ChartCard name={name}>
        {/* Child 1 */}
        <>
          {/* Chart 1 */}
          <VictoryChart
            scale={{ x: 'time', y: 'linear' }}
            style={{ parent: { maxWidth: '50%', } }}
            // theme={VictoryTheme.material}
            domain={{ y: [400, 600] }}
          >
            <VictoryLabel text={'Operations Queued Due to Lock'} x={240} y={30} textAnchor="middle" />
            <VictoryLine
              style={{ data: { stroke: '#98DED9' } }}
              data={queuedOperationsData}
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
            <VictoryLabel text={'Number of Connections'} x={240} y={30} textAnchor="middle" />
            <VictoryLine
              style={{ data: { stroke: '#98DED9' } }}
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
