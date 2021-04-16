import AWS, { AWSData } from './aws';
import Vector, { VectorData } from './vector';
import Conf from 'conf';

const config = new Conf();

/*
 * Store is an singleton that will contain all data over the lifetime
 * of the CLI command. Handles loading the state from disk
 * if it exists, keeping track of the current state, and writing the
 * state to disk prior to exiting.
 */
class Store {
  AWS: AWS;

  Vector: Vector;

  constructor({
    AWS: aws,
    Vector: vector,
  }: CacheData) {
    this.AWS = new AWS(aws);
    this.Vector = new Vector(vector);
  }

  /**
   * Call this function when an error occurs and you plan to exit.
   * This function will dump the current state to the cache to prevent data loss.
   */
  dump() {
    config.set('state', this);
  }

  /**
   * Clears the persistent cache .
   */
  clean() {
    config.delete('state');
  }
}

interface CacheData {
  AWS: AWSData;
  Vector: VectorData;
}

/*
 * Load state from cache if it exists.
 * The file location is `~/.config/dendro-cli-nodejs/config.json`
 */
const cache: CacheData = config.get('state') as CacheData || {
  AWS: {
    Credentials: {},
    Lambda: {},
    S3: { bucketName: 'dendrodefaultbucket1' },
    Firehose: { deliveryStreamName: 'dendroflumechuck-stream696' },
    Timestream: { DatabaseName: 'dendroflumechuck-timestream2923', TableName: 'default-table' },
    IAM: { RoleName: 'dendroflumechuck-role9982' },
  },
  Vector: {
    Postgres: {},
    Nginx: {},
    Apache: {},
    Host: {},
    Mongo: {},
    CustomApplications: []
  },
};

export default new Store(cache);
