import store from '../../store';
import log from '../../utils/log';
import {
  AWS_REGION,
  AWS_FIREHOSE_STREAM_NAME,
  VECTOR_MONGO_LOGS_TYPE,
  VECTOR_MONGO_METRICS_TYPE,
} from '../../constants';

const logConfig = (): string => {
  log.debug('Writing Mongo vector log config');
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
  .type = "${VECTOR_MONGO_LOGS_TYPE}"
  '''

[sinks.mongo_logs_firehose_stream_sink]
  # General
  type = "aws_kinesis_firehose"
  inputs = ["mongo_logs_transform"]

  # AWS
  region = "${AWS_REGION}"
  stream_name = "${AWS_FIREHOSE_STREAM_NAME}"

  ## Auth
  auth.access_key_id = "${store.AWS.Credentials.accessKeyId}"
  auth.secret_access_key = "${store.AWS.Credentials.secretAccessKey}"

  # Encoding
  encoding.codec = "json"

#############################################
`;
};

const metricConfig = (): string => {
  log.debug('Writing Mongo vector metric config');
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
  .type = "${VECTOR_MONGO_METRICS_TYPE}"
  '''

[sinks.mongo_metrics_firehose_stream_sink]
  # General
  type = "aws_kinesis_firehose"
  inputs = ["mongo_metrics_transform"]

  # AWS
  region = "${AWS_REGION}"
  stream_name = "${AWS_FIREHOSE_STREAM_NAME}"

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
