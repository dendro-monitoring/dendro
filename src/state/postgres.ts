export type PostgresData = {
  username: string;
  password: string;
  port: number;
  url: string;
  databaseName: string;
  scrapeInterval: number;
}

class Postgres {
  username: string;

  password: string;

  port: number;

  url: string;

  databaseName: string;

  scrapeInterval: number;

  constructor({
    username,
    password,
    port,
    url,
    databaseName,
    scrapeInterval,
  }: PostgresData) {
    this.username = username
    this.password = password
    this.port = port
    this.url = url
    this.databaseName = databaseName
    this.scrapeInterval = scrapeInterval
  }
}

export default Postgres
