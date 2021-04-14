export interface PostgresData {
  username: string;
  password: string;
  port: number;
  url: string;
  databaseName: string;
  scrapeInterval: number;
  monitorErrorLogs: boolean;
  monitorMetrics: boolean;
}

class Postgres {
  username: string;

  password: string;

  port: number;

  url: string;

  databaseName: string;

  scrapeInterval: number;

  monitorErrorLogs: boolean;

  monitorMetrics: boolean;

  constructor({
    username,
    password,
    port,
    url,
    databaseName,
    scrapeInterval,
    monitorErrorLogs,
    monitorMetrics,
  }: PostgresData) {
    this.username = username
    this.password = password
    this.port = port
    this.url = url
    this.databaseName = databaseName
    this.scrapeInterval = scrapeInterval
    this.monitorErrorLogs = monitorErrorLogs
    this.monitorMetrics = monitorMetrics
  }
}

export default Postgres
