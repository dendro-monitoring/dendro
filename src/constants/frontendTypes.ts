export type VectorService = 'apacheMetrics'
| 'apacheAccessLogs'
| 'apacheErrorLogs'
| 'customApplication'
| 'hostMetrics'
| 'mongoMetrics'
| 'mongoLogs'
| 'nginxMetrics'
| 'nginxAccessLogs'
| 'nginxErrorLogs'
| 'postgresMetrics'
| 'postgresLogs';

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

export interface ChartScale {
  x: string;
  y: string;
}
