import AWS, { AWSData } from './aws';
import Vector, { VectorData } from './vector';
import Conf from 'conf';
import log from '../utils/log';

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
    log.debug(`Dumping store data:`);
    log.debug(this as unknown as string);
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

const diskCache = config.get('state') as CacheData;

/**
 * Helper function to run debug logs for the store.
 * Log level cannot be set until after this code would run.
 * So this code is wrapped into a function and exported instead.
 * 
 * Usage:
 * 
 * ```
 * // Some command file
 * import log from '../utils/log';
 * import { storeDebugLogs } from '../store';
 * 
 * class Command {
 *   async run() {
 *     const { flags } = this.parse(Command);
 *     log.setLevel(flags.level as LevelNames);
 *     storeDebugLogs();
 *   };
 * };
 * ```
 */
export const storeDebugLogs = (): void => {
  if (diskCache) {
    log.debug('Found cache data');
    log.debug(`Store data:`);
    log.debug(diskCache as unknown as string);
  } else {
    log.debug('No cache data found');
  }
}; 

/*
 * Load state from cache if it exists.
 * The file location is `~/.config/dendro-cli-nodejs/config.json`
 */
const cache: CacheData = diskCache|| {
  AWS: {
    Credentials: {},
    Lambda: {},
    S3: {},
    Firehose: {},
    Timestream: {},
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
