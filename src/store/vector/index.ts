import Postgres, { PostgresData } from './postgres';
import Nginx, { NginxData } from './nginx';
import Apache, { ApacheData } from './apache';
import Host, { HostData } from './host';
import Mongo, { MongoData } from './mongo';
import CustomApplication, { CustomApplicationData } from './customApplication';

export interface VectorData {
  Postgres: PostgresData;
  Nginx: NginxData;
  Apache: ApacheData;
  Host: HostData;
  Mongo: MongoData;
  CustomApplications: CustomApplication[];
}

class Vector {
  Postgres: Postgres;

  Nginx: Nginx;

  Apache: Apache;

  Host: Host;

  Mongo: Mongo;

  CustomApplications: CustomApplication[];

  constructor({
    Postgres: postgres = {},
    Nginx: nginx = {},
    Apache: apache = {},
    Host: host = {},
    Mongo: mongo = {},
    CustomApplications: customApplications = []
  }: VectorData) {
    this.Postgres = new Postgres(postgres);
    this.Nginx = new Nginx(nginx);
    this.Apache = new Apache(apache);
    this.Host = new Host(host);
    this.Mongo = new Mongo(mongo);
    this.CustomApplications = customApplications;
  }

  /**
   * Adds a custom application to the storage array.
   * @param data The custom application you would like to add
   */
  setCustomApp(data: CustomApplicationData): void {
    this.CustomApplications.push(
      new CustomApplication(data),
    );
  }
}

export default Vector;
