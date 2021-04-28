export type VectorService = 'apache-metrics'
| 'apache-logs'
| 'custom-application'
| 'host-metrics'
| 'mongo-metrics'
| 'mongo-logs'
| 'nginx-metrics'
| 'nginx-logs'
| 'postgres-metrics'
| 'postgres-logs';

export interface MonitoredService {
  name: VectorService
}

export interface QueryRow {
  ScalarValue: string
}

export interface QueryData {
  Data: QueryRow[]
}

export interface QueryHeader {
  Name: string
}

export interface CloudWatchLog {
  TIME: string;
  ingestionTime: string;
  message: string;
}

export interface ChartDataPoint {
  x: any;
  y: any;
}

export interface ChartData {
  labelText: string;
  dataPoints: ChartDataPoint[];
  stroke?: string;
}
