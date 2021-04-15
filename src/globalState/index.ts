import AWS, { AWSData } from './aws';
import Vector, { VectorData } from './vector';

/*
 * GlobalState is an singleton that will contain all data over the lifetime
 * of the CLI command. Currently, it is initialized to no data, however after
 * we start making the CLI stateful, it should handle fetching the cache data
 * during initialization.
 */
class GlobalState {
  AWS: AWS;

  Vector: Vector;

  constructor({
    aws,
    vector,
  }: CacheData) {
    this.AWS = new AWS(aws);
    this.Vector = new Vector(vector);
  }

  /*
   * Call this function when an error occurs and you plan to exit.
   * This function will dump the current state to the cache to prevent data loss.
   */
  dump() {
    console.log(this);
  }
}

interface CacheData {
  aws: AWSData;
  vector: VectorData;
}

/*
 * TODO: Load state from cache if it exists.
 * This hardcoded data will be removed and the cache data or
 * an empty object will be passed into `new GlobalState(cache)`.
 */
const cache: CacheData = {
  aws: {
    credentials: {},
    lambda: {},
    s3: {},
    firehose: {},
    timestream: {},
  },
  vector: {
    postgres: {},
    nginx: {},
  },
};

export default new GlobalState(cache);
