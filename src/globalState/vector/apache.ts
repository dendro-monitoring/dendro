export interface ApacheData {
  port?: string;
  url?: string;
  scrapeInterval?: number;
  monitorAccessLogs?: boolean;
  monitorErrorLogs?: boolean;
  monitorMetrics?: boolean;
}

class Apache {
  port: string;

  url: string;

  scrapeInterval: number;

  monitorAccessLogs: boolean;

  monitorErrorLogs: boolean;

  monitorMetrics: boolean;

  constructor({
    port = '80',
    url = 'localhost',
    scrapeInterval = 15,
    monitorAccessLogs = false,
    monitorErrorLogs = false,
    monitorMetrics = false,
  }: ApacheData) {
    this.port = port;
    this.url = url;
    this.scrapeInterval = scrapeInterval;
    this.monitorAccessLogs = monitorAccessLogs;
    this.monitorErrorLogs = monitorErrorLogs;
    this.monitorMetrics = monitorMetrics;
  }
}

export default Apache;
