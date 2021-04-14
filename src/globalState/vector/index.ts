import Postgres, { PostgresData } from './postgres'

export interface VectorData {
  postgres?: PostgresData;
}

class Vector {
  Postgres?: Postgres;

  constructor({ postgres }: VectorData) {
    if (postgres) {
      this.Postgres = new Postgres(postgres)
    }
  }
}

export default Vector
