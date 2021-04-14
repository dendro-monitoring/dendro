import Postgres, { PostgresData } from './postgres'
import Nginx, { NginxData } from './nginx'
import Apache, { ApacheData } from './apache'
import Host, { HostData } from './host'
import Mongo, { MongoData } from './mongo'

export interface VectorData {
  postgres?: PostgresData;
  nginx?: NginxData;
  apache?: ApacheData;
  host?: HostData;
  mongo?: MongoData;
}

class Vector {
  Postgres: Postgres;

  Nginx: Nginx;

  Apache: Apache;

  Host: Host;

  Mongo: Mongo;

  constructor({
    postgres = {},
    nginx = {},
    apache = {},
    host = {},
    mongo = {},
  }: VectorData) {
    this.Postgres = new Postgres(postgres)
    this.Nginx = new Nginx(nginx)
    this.Apache = new Apache(apache)
    this.Host = new Host(host)
    this.Mongo = new Mongo(mongo)
  }
}

export default Vector
