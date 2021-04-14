import { ensureCredentials } from '../utils/aws'

import { buildApacheConfig } from './configs/apache'
import { buildHostConfig } from './configs/host'
import { buildMongoConfig } from './configs/mongo'
import { buildNginxConfig } from './configs/nginx'
import { buildPostgresConfig } from './configs/postgres'

export const buildVectorConfig = () => {
  ensureCredentials('Tried writing vector configs without aws credentials existing.')

  buildApacheConfig()
  // buildCustomApplications()
  buildHostConfig()
  buildMongoConfig()
  buildNginxConfig()
  buildPostgresConfig()
}
