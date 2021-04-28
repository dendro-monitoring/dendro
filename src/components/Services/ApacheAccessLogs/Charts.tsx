import { ChartData } from '../../../constants/frontendTypes';
import ChartCard from '../ChartCard';

export default function Chart({ name }: { name: string }) {
  const chart1: ChartData = {
    labelText: 'Average Query Duration (s)',
    dataPoints: [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 5 },
      { x: 4, y: 4 },
      { x: 5, y: 7 }
    ]
  };

  const chartData: ChartData[] = [chart1, chart1];

  return <ChartCard name={name} charts={chartData}/>;
}
