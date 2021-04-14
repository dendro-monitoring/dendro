import Postgres, { PostgresData } from './postgres'
import Nginx, { NginxData } from './nginx'
import Apache, { ApacheData } from './apache'
import Host, { HostData } from './host'

export interface VectorData {
  postgres?: PostgresData;
  nginx?: NginxData;
  apache?: ApacheData;
  host?: HostData;
}

class Vector {
  Postgres: Postgres;

  Nginx: Nginx;

  Apache: Apache;

  Host: Host;

  constructor({
    postgres = {},
    nginx = {},
    apache = {},
    host = {},
  }: VectorData) {
    this.Postgres = new Postgres(postgres)
    this.Nginx = new Nginx(nginx)
    this.Apache = new Apache(apache)
    this.Host = new Host(host)
  }
}

export default Vector
