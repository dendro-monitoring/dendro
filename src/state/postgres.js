class Postgres {
  constructor({
    username,
    password,
    port,
    url,
    databaseName,
    scrapeInterval,
  }) {
    this.username = username
    this.password = password
    this.port = port
    this.url = url
    this.databaseName = databaseName
    this.scrapeInterval = scrapeInterval
  }
}

module.exports = Postgres
