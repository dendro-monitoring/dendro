import Lambda, { LambdaData } from './lambda'
import S3, { S3Data } from './s3'
import Firehose, { FirehoseData } from './firehose'
import Timestream, { TimestreamData } from './timestream'
import Vector, { VectorData } from './vector'

/*
 * GlobalState is an singleton that will contain all data over the lifetime
 * of the CLI command. Currently, it is initialized to no data, however after
 * we start making the CLI stateful, it should handle fetching the cache data
 * during initialization.
 */
class GlobalState {
  Lambda: Lambda;

  S3: S3;

  Firehose: Firehose;

  Timestream: Timestream;

  Vector: Vector;

  constructor({
    lambda,
    s3,
    firehose,
    timestream,
    vector,
  }: CacheData) {
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

interface CacheData {
  lambda: LambdaData;
  s3: S3Data;
  firehose: FirehoseData;
  timestream: TimestreamData;
  vector: VectorData;
}

// TODO: Load state from cache if it exists
const cache: CacheData = {
  lambda: {},
  s3: {},
  firehose: {},
  timestream: {},
  vector: {},
}

export default new GlobalState(cache)
