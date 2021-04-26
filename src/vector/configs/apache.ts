import store from '../../store';
import log from '../../utils/log';
import {
  AWS_REGION,
  AWS_FIREHOSE_STREAM_NAME,
  VECTOR_APACHE_ACCESS_LOGS_TYPE,
  VECTOR_APACHE_ERROR_LOGS_TYPE,
  VECTOR_APACHE_METRICS_TYPE
} from '../../constants';

const accessLogConfig = (): string => {
  log.debug('Writing Apache vector access log config');
  return `
################ Apache Logs #############################

[sources.apache_logs]
  type = "file"
  include = ["/var/log/apache2/access_log",]
  read_from = "beginning"

[transforms.apache_logs_transform]
  type = "remap"
  inputs = ["apache_logs"]
  source = '''
  .type = "${VECTOR_APACHE_ACCESS_LOGS_TYPE}"
  .parsed = parse_apache_log!(.message, format: "common")
  del(.message)
  '''

[sinks.apache_logs_firehose_stream_sink]
  # General
  type = "aws_kinesis_firehose"
  inputs = ["apache_logs_transform"]

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

const errorLogConfig = (): string => {
  log.debug('Writing Apache vector log config');
  return `
################ Apache Logs #############################

[sources.apache_logs]
  type = "file"
  include = ["/var/log/apache2/error_log"]
  read_from = "beginning"

[transforms.apache_regex_transform]
  # General
  type = "regex_parser"
  inputs = ["apache_logs"]
  patterns = ['^((?P<apache_timestamp>\\[\\w+ \\w+ \\d+ \\d+:\\d+:\\d+.\\d+ \\d+\\]) )?(\\[(?P<source_file>\\w+):(?P<level>\\w+)\\] \\[pid (?P<pid>\\d+):tid (?P<tid>\\d+)\\] )?(?P<message>[a-zA-Z0-9-_ \\W]*)']

# TODO: Only works with access_log
[transforms.apache_logs_transform]
  type = "remap"
  inputs = ["apache_regex_transform"]
  source = '''
  .type = "${VECTOR_APACHE_ERROR_LOGS_TYPE}"
  '''

[sinks.apache_logs_firehose_stream_sink]
  # General
  type = "aws_kinesis_firehose"
  inputs = ["apache_logs_transform"]

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
  log.debug('Writing Apache vector metric config');
  const {
    url,
    port,
    scrapeIntervalSeconds
  } = store.Vector.Apache;

  return `
################ Apache Metrics #############################

[sources.apache_metrics]
  type = "apache_metrics"
  endpoints = ["http://${url}:${port}/server-status/?auto"]
  scrape_interval_secs = ${scrapeIntervalSeconds}

[transforms.apache_metrics_to_logs]
  type = "metric_to_log"
  inputs = ["apache_metrics"]

[transforms.apache_metrics_transform]
  type = "remap"
  inputs = ["apache_metrics_to_logs"]
  source = '''
  .type = "${VECTOR_APACHE_METRICS_TYPE}"
  '''

[sinks.apache_metrics_firehose_stream_sink]
  # General
  type = "aws_kinesis_firehose"
  inputs = ["apache_metrics_transform"]

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

export const buildApacheConfig = (): string => {
  let config = '';

  if (store.Vector.Apache.monitorMetrics) {
    config += metricConfig();
  }

  if (store.Vector.Apache.monitorAccessLogs) {
    config += accessLogConfig();
  }

  if (store.Vector.Apache.monitorErrorLogs) {
    config += errorLogConfig();
  }

  return config;
};
