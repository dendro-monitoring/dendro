export interface NginxData {
  port?: string;
  url?: string;
  scrapeIntervalSeconds?: number;
  monitorAccessLogs?: boolean;
  monitorErrorLogs?: boolean;
  monitorMetrics?: boolean;
}

class Nginx {
  port: string;

  url: string;

  scrapeIntervalSeconds: number;

  monitorAccessLogs: boolean;

  monitorErrorLogs: boolean;

  monitorMetrics: boolean;

  constructor({
    port = '80',
    url = 'localhost',
    scrapeIntervalSeconds = 15,
    monitorAccessLogs = false,
    monitorErrorLogs = false,
    monitorMetrics = false,
  }: NginxData) {
    this.port = port;
    this.url = url;
    this.scrapeIntervalSeconds = scrapeIntervalSeconds;
    this.monitorAccessLogs = monitorAccessLogs;
    this.monitorErrorLogs = monitorErrorLogs;
    this.monitorMetrics = monitorMetrics;
  }
}

export default Nginx;
