import globalState from '../../globalState'
import { ensureCredentials } from '../../utils/aws'

const logConfig = () => {
  return `
\n################ Postgres Logs #############################

[sources.postgres_logs]
type = "file"
include = ["/var/log/postgresql/*.log"]
read_from = "beginning"

[transforms.postgres_logs_add_transform]
type = "remap"
inputs = ["postgres_logs"]
source = '''
.type = "postgres"
'''

[sinks.postgres_logs_firehose_stream_sink]
# General
type = "aws_kinesis_firehose" # required
inputs = ["postgres_logs_add_transform"] # required
region = "us-east-2" # required, required when endpoint = null
stream_name = "PostgresDendroStream" # required
auth.access_key_id = "${globalState.AWS.Credentials?.accessKeyId}"
auth.secret_access_key = "${globalState.AWS.Credentials?.secretAccessKey}"
# Encoding
encoding.codec = "json" # required
# Healthcheck
healthcheck.enabled = true # optional, default

#############################################\n
    `
}

const metricConfig = () => {}

export const buildPostgresConfig = () => {
  ensureCredentials('Tried writing Postgres vector config without aws credentials existing.')

  let config = ''

  if (globalState.Vector.Postgres?.monitorMetrics) {
    config += metricConfig()
  }

  if (globalState.Vector.Postgres?.monitorErrorLogs) {
    config += logConfig()
  }

  return config
}
