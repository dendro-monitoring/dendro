import * as fs from 'fs';
import * as path from 'path';

import log from '../utils/log';

import { buildApacheConfig } from './configs/apache';
import { buildCustomApplications } from './configs/customApplication';
import { buildHostConfig } from './configs/host';
import { buildMongoConfig } from './configs/mongo';
import { buildNginxConfig } from './configs/nginx';
import { buildPostgresConfig } from './configs/postgres';

/**
 * Build the vector config file based on the current store
 * @returns {String} The vector config file ready to write to disk
 */
const buildVectorConfig = (): string => {
  log.debug('Writing vector config');

  let config = '';
  config += buildApacheConfig();
  config += buildCustomApplications();
  config += buildHostConfig();
  config += buildMongoConfig();
  config += buildNginxConfig();
  config += buildPostgresConfig();

  log.debug(`Vector config file: \n${config}`);

  return config;
};

export const writeVectorConfig = async (): Promise<void> => {
  fs.writeFile(
    path.resolve(process.cwd(), 'vector-config.toml'),
    buildVectorConfig(),
    (err) => { if (err) throw err; }
  );
};
