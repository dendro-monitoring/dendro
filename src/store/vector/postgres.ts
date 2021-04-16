export interface PostgresData {
  username?: string;
  password?: string;
  port?: string;
  url?: string;
  databaseName?: string;
  scrapeIntervalSeconds?: number;
  monitorErrorLogs?: boolean;
  monitorMetrics?: boolean;
}

class Postgres {
  username: string;

  password: string;

  port: string;

  url: string;

  databaseName: string;

  scrapeIntervalSeconds: number;

  monitorErrorLogs: boolean;

  monitorMetrics: boolean;

  constructor({
    username = 'postgres',
    password = 'postgres',
    port = '5432',
    url = 'localhost',
    databaseName = 'postgres',
    scrapeIntervalSeconds = 15,
    monitorErrorLogs = false,
    monitorMetrics = false,
  }: PostgresData) {
    this.username = username;
    this.password = password;
    this.port = port;
    this.url = url;
    this.databaseName = databaseName;
    this.scrapeIntervalSeconds = scrapeIntervalSeconds;
    this.monitorErrorLogs = monitorErrorLogs;
    this.monitorMetrics = monitorMetrics;
  }
}

export default Postgres;
