import Postgres, { PostgresData } from './postgres';
import Nginx, { NginxData } from './nginx';
import Apache, { ApacheData } from './apache';
import Host, { HostData } from './host';
import Mongo, { MongoData } from './mongo';
import CustomApplication, { CustomApplicationData } from './customApplication';

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

  CustomApplications: CustomApplication[];

  constructor({
    postgres = {},
    nginx = {},
    apache = {},
    host = {},
    mongo = {},
  }: VectorData) {
    this.Postgres = new Postgres(postgres);
    this.Nginx = new Nginx(nginx);
    this.Apache = new Apache(apache);
    this.Host = new Host(host);
    this.Mongo = new Mongo(mongo);
    this.CustomApplications = [];
  }

  setCustomApp(data: CustomApplicationData) {
    this.CustomApplications.push(
      new CustomApplication(data),
    );
  }
}

export default Vector;
