const Lambda = require('./lambda')
const S3 = require('./s3')
const Firehose = require('./firehose')
const Timestream = require('./timestream')
const Vector = require('./vector')

/*
 * GlobalState is an singleton that will contain all data over the lifetime
 * of the CLI command. Currently, it is initialized to no data, however after
 * we start making the CLI stateful, it should handle fetching the cache data
 * during initialization.
 */
class GlobalState {
  constructor({
    lambda,
    s3,
    firehose,
    timestream,
    vector,
  }) {
    this.Lambda = new Lambda(lambda)
    this.S3 = new S3(s3)
    this.Firehose = new Firehose(firehose)
    this.Timestream = new Timestream(timestream)
    this.Vector = new Vector(vector)
  }

  /*
   * Call this function when an error occurs and you plan to exit.
   * This function will dump the current state to the cache to prevent data loss.
   */
  dump() {
    console.log(this)
  }
}

// TODO: Load state from cache if it exists
const cache = {
  lambda: {},
  s3: {},
  firehose: {},
  timestream: {},
  vector: {},
}
const globalState = new GlobalState(cache)

module.exports = globalState
