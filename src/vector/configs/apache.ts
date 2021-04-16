import store from '../../store';
import log from '../../utils/log';

const logConfig = (): string => {
  log.debug('Writing Apache vector log config');
  return `
################ Apache Logs #############################

[sources.apache_logs]
  type = "file"
  include = [
    ${store.Vector.Apache.monitorAccessLogs ? '"/var/log/apache2/access.log",' : null}
    ${store.Vector.Apache.monitorErrorLogs ? '"/var/log/apache2/error.log"' : null}
  ]
  read_from = "beginning"

[transforms.apache_logs_transform]
  type = "remap"
  inputs = ["apache_logs"]
  source = '''
  .type = "apache-logs"
  '''

[sinks.apache_logs_firehose_stream_sink]
  # General
  type = "aws_kinesis_firehose"
  inputs = ["apache_logs_transform"]

  # AWS
  region = "us-east-2", required when endpoint = null
  stream_name = "ApacheLogsDendroStream"

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
  .type = "apache-metrics"
  '''

[sinks.apache_metrics_firehose_stream_sink]
  # General
  type = "aws_kinesis_firehose"
  inputs = ["apache_metrics_transform"]

  # AWS
  region = "us-east-2"
  stream_name = "ApacheMetricsDendroStream"

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

  if (
    store.Vector.Apache.monitorAccessLogs ||
    store.Vector.Apache.monitorErrorLogs
  ) {
    config += logConfig();
  }

  return config;
};
