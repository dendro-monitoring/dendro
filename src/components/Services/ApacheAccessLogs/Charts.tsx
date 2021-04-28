import { ChartDataPoint } from '../../../constants/frontendTypes';
import ChartCard from '../ChartCard';
import { VictoryChart, VictoryTheme, VictoryLine, VictoryLabel } from 'victory';

export default function Chart({ name }: { name: string }) {
  const chartData1: ChartDataPoint[] = [
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 5 },
    { x: 4, y: 4 },
    { x: 5, y: 7 }
  ];

  return (
    <>
      <h1 className="text-3xl font-semibold">{name}</h1>
      <ChartCard name={name}>
        {/* Child 1 */}
        <>
          {/* Chart 1 */}
          <VictoryChart
            style={{ parent: { maxWidth: '50%', } }}
            theme={VictoryTheme.material}
            key="hi"
          >
            <VictoryLabel text={'Average Query Duration (s)'} x={180} y={30} textAnchor="middle"/>
            <VictoryLine
              style={{
                data: { stroke: '#EF4444' },
                parent: { border: '1px solid #9CA3AF' }
              }}
              data={chartData1}
            />
          </VictoryChart>

          {/* Chart 2 */}
          <VictoryChart
            style={{ parent: { maxWidth: '50%', } }}
            theme={VictoryTheme.material}
            key="hi"
          >
            <VictoryLabel text={'Average Query Duration (s)'} x={180} y={30} textAnchor="middle"/>
            <VictoryLine
              style={{
                data: { stroke: '#EF4444' },
                parent: { border: '1px solid #9CA3AF' }
              }}
              data={chartData1}
            />
          </VictoryChart>
        </>

        {/* Child 2 */}
        <>
          {/* Chart 3 */}
          <VictoryChart
            style={{ parent: { maxWidth: '50%', } }}
            theme={VictoryTheme.material}
            key="hi"
          >
            <VictoryLabel text={'Average Query Duration (s)'} x={180} y={30} textAnchor="middle"/>
            <VictoryLine
              style={{
                data: { stroke: '#EF4444' },
                parent: { border: '1px solid #9CA3AF' }
              }}
              data={chartData1}
            />
          </VictoryChart>

          {/* Chart 4 */}
          <VictoryChart
            style={{ parent: { maxWidth: '50%', } }}
            theme={VictoryTheme.material}
            key="hi"
          >
            <VictoryLabel text={'Average Query Duration (s)'} x={180} y={30} textAnchor="middle"/>
            <VictoryLine
              style={{
                data: { stroke: '#EF4444' },
                parent: { border: '1px solid #9CA3AF' }
              }}
              data={chartData1}
            />
          </VictoryChart>
        </>
      </ChartCard>
    </>
  );
}
