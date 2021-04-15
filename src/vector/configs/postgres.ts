import globalState from '../../globalState';

const logConfig = (): string => {
  return `
################ Postgres Logs #############################

[sources.postgres_logs]
  type = "file"
  include = ["/var/log/postgresql/*.log"]
  read_from = "beginning"

[transforms.postgres_logs_transform]
  type = "remap"
  inputs = ["postgres_logs"]
  source = '''
  .type = "postgres-logs"
  '''

[sinks.postgres_logs_firehose_stream_sink]
  # General
  type = "aws_kinesis_firehose"
  inputs = ["postgres_logs_transform"]

  # AWS
  region = "us-east-2"
  stream_name = "PostgresLogsDendroStream"

  ## Auth
  auth.access_key_id = "${globalState.AWS.Credentials?.accessKeyId}"
  auth.secret_access_key = "${globalState.AWS.Credentials?.secretAccessKey}"

  # Encoding
  encoding.codec = "json"

#############################################
`;
};


const metricConfig = (): string => {
  const {
    username,
    password,
    url,
    port,
    databaseName,
    scrapeIntervalSeconds
  } = globalState.Vector.Postgres;

  return `
################ Postgres Metrics #############################

[sources.postgres_metric]
  type = "postgresql_metrics"
  endpoints = ["postgresql://${username}:${password}@${url}:${port}/${databaseName}"]
  scrape_interval_secs = ${scrapeIntervalSeconds}

[transforms.postgres_metrics_to_logs]
  type = "metric_to_log"
  inputs = ["postgres_metrics"]

[transforms.postgres_metrics_transform]
type = "remap"
inputs = ["postgres_metrics_to_logs"]
source = '''
.type = "postgres-metrics"
'''

[sinks.postgres_metrics_firehose_stream_sink]
# General
type = "aws_kinesis_firehose"
inputs = ["postgres_metrics_transform"]

# AWS
region = "us-east-2"
stream_name = "PostgresMetricsDendroStream"

## Auth
auth.access_key_id = "${globalState.AWS.Credentials.accessKeyId}"
auth.secret_access_key = "${globalState.AWS.Credentials.secretAccessKey}"

# Encoding
encoding.codec = "json"

#############################################
`;
};

export const buildPostgresConfig = (): string => {
  let config = '';

  if (globalState.Vector.Postgres.monitorMetrics) {
    config += metricConfig();
  }

  if (globalState.Vector.Postgres.monitorErrorLogs) {
    config += logConfig();
  }

  return config;
};
