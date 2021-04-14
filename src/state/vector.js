const Postgres = require('./postgres')

class Vector {
  constructor({
    postgres,
  }) {
    this.Postgres = new Postgres(postgres)
  }
}

module.exports = Vector
