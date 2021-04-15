export interface MongoData {
  port?: string;
  url?: string;
  scrapeInterval?: number;
  monitorLogs?: boolean;
  monitorMetrics?: boolean;
}

class Mongo {
  port: string;

  url: string;

  scrapeInterval: number;

  monitorLogs: boolean;

  monitorMetrics: boolean;

  constructor({
    port = '80',
    url = 'localhost',
    scrapeInterval = 15,
    monitorLogs = false,
    monitorMetrics = false,
  }: MongoData) {
    this.port = port;
    this.url = url;
    this.scrapeInterval = scrapeInterval;
    this.monitorLogs = monitorLogs;
    this.monitorMetrics = monitorMetrics;
  }
}

export default Mongo;
