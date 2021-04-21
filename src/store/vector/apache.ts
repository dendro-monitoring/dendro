export interface ApacheData {
  port?: string;
  url?: string;
  scrapeIntervalSeconds?: string;
  monitorAccessLogs?: boolean;
  monitorErrorLogs?: boolean;
  monitorMetrics?: boolean;
}

class Apache {
  port: string;

  url: string;

  scrapeIntervalSeconds: string;

  monitorAccessLogs: boolean;

  monitorErrorLogs: boolean;

  monitorMetrics: boolean;

  constructor({
    port = '80',
    url = 'localhost',
    scrapeIntervalSeconds = '15',
    monitorAccessLogs = false,
    monitorErrorLogs = false,
    monitorMetrics = false,
  }: ApacheData) {
    this.port = port;
    this.url = url;
    this.scrapeIntervalSeconds = scrapeIntervalSeconds;
    this.monitorAccessLogs = monitorAccessLogs;
    this.monitorErrorLogs = monitorErrorLogs;
    this.monitorMetrics = monitorMetrics;
  }
}

export default Apache;
