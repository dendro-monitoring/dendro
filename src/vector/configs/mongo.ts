import store from '../../store';

const logConfig = (): string => {
  return `
################ Mongo Logs #############################

[sources.mongo_logs]
  type = "file"
  include = [
    ${store.Vector.Mongo.monitorLogs ? '"/var/log/mongodb/*.log",' : null}
  ]
  read_from = "beginning"

[transforms.mongo_logs_transform]
  type = "remap"
  inputs = ["mongo_logs"]
  source = '''
  .type = "mongo-logs"
  '''

[sinks.mongo_logs_firehose_stream_sink]
  # General
  type = "aws_kinesis_firehose"
  inputs = ["mongo_logs_transform"]

  # AWS
  region = "us-east-2", required when endpoint = null
  stream_name = "MongoLogsDendroStream"

  ## Auth
  auth.access_key_id = "${store.AWS.Credentials.accessKeyId}"
  auth.secret_access_key = "${store.AWS.Credentials.secretAccessKey}"

  # Encoding
  encoding.codec = "json"

#############################################
`;
};

const metricConfig = (): string => {
  const {
    url,
    port,
    scrapeIntervalSeconds
  } = store.Vector.Mongo;

  return `
################ Mongo Metrics #############################

[sources.mongo_metrics]
  type = "mongo_metrics"
  endpoints = ["mongodb://${url}:${port}"]
  scrape_interval_secs = ${scrapeIntervalSeconds}

[transforms.mongo_metrics_to_logs]
  type = "metric_to_log"
  inputs = ["mongo_metrics"]

[transforms.mongo_metrics_transform]
  type = "remap"
  inputs = ["mongo_metrics_to_logs"]
  source = '''
  .type = "mongo-metrics"
  '''

[sinks.mongo_metrics_firehose_stream_sink]
  # General
  type = "aws_kinesis_firehose"
  inputs = ["mongo_metrics_transform"]

  # AWS
  region = "us-east-2"
  stream_name = "MongoMetricsDendroStream"

  ## Auth
  auth.access_key_id = "${store.AWS.Credentials.accessKeyId}"
  auth.secret_access_key = "${store.AWS.Credentials.secretAccessKey}"

  # Encoding
  encoding.codec = "json"

#############################################
`;
};

export const buildMongoConfig = (): string => {
  let config = '';

  if (store.Vector.Mongo.monitorMetrics) {
    config += metricConfig();
  }

  if (store.Vector.Mongo.monitorLogs) {
    config += logConfig();
  }

  return config;
};
