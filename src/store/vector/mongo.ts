export interface MongoData {
  port?: string;
  url?: string;
  scrapeIntervalSeconds?: number;
  monitorLogs?: boolean;
  monitorMetrics?: boolean;
}

class Mongo {
  port: string;

  url: string;

  scrapeIntervalSeconds: number;

  monitorLogs: boolean;

  monitorMetrics: boolean;

  constructor({
    port = '27017',
    url = 'localhost',
    scrapeIntervalSeconds = 15,
    monitorLogs = false,
    monitorMetrics = false,
  }: MongoData) {
    this.port = port;
    this.url = url;
    this.scrapeIntervalSeconds = scrapeIntervalSeconds;
    this.monitorLogs = monitorLogs;
    this.monitorMetrics = monitorMetrics;
  }
}

export default Mongo;
