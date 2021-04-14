import Postgres, { PostgresData } from './postgres'
import Nginx, { NginxData } from './nginx'

export interface VectorData {
  postgres?: PostgresData;
  nginx?: NginxData;
}

class Vector {
  Postgres: Postgres;

  Nginx: Nginx;

  constructor({
    postgres = {},
    nginx = {},
  }: VectorData) {
    this.Postgres = new Postgres(postgres)
    this.Nginx = new Nginx(nginx)
  }
}

export default Vector
