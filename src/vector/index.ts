import { ensureCredentials } from '../utils/aws';

import { buildApacheConfig } from './configs/apache';
import { buildCustomApplications } from './configs/customApplication';
import { buildHostConfig } from './configs/host';
import { buildMongoConfig } from './configs/mongo';
import { buildNginxConfig } from './configs/nginx';
import { buildPostgresConfig } from './configs/postgres';

/**
 * Build the vector config file based on the current global state
 * @returns The vector config file ready to write to disk
 */
export const buildVectorConfig = (): string => {
  ensureCredentials('Tried writing vector configs without aws credentials existing.');

  let config = '';
  config += buildApacheConfig();
  config += buildCustomApplications();
  config += buildHostConfig();
  config += buildMongoConfig();
  config += buildNginxConfig();
  config += buildPostgresConfig();

  return config;
};
