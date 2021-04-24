import store from '../../store';
import log from '../../utils/log';
import {
  AWS_REGION,
  AWS_FIREHOSE_STREAM_NAME,
  VECTOR_NGINX_LOGS_TYPE,
  VECTOR_NGINX_METRICS_TYPE,
} from '../../constants';

const logConfig = (): string => {
  log.debug('Writing Nginx vector log config');
  return `
################ Nginx Logs #############################

[sources.nginx_logs]
  type = "file"
  include = [
    ${store.Vector.Nginx.monitorAccessLogs ? '"/var/log/nginx/access.log*",' : null}
    ${store.Vector.Nginx.monitorErrorLogs ? '"/var/log/nginx/error.log*"' : null}
  ]
  read_from = "beginning"

[transforms.nginx_logs_transform]
  type = "remap"
  inputs = ["nginx_logs"]
  source = '''
  .parsed = parse_nginx_log!(.message, "combined")
  del(.message)
  .type = "${VECTOR_NGINX_LOGS_TYPE}"
  '''

[sinks.nginx_logs_firehose_stream_sink]
  # General
  type = "aws_kinesis_firehose"
  inputs = ["nginx_logs_transform"]

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
  log.debug('Writing Nginx vector metric config');
  const {
    url,
    port,
    scrapeIntervalSeconds
  } = store.Vector.Nginx;

  return `
################ Nginx Metrics #############################

[sources.nginx_metrics]
  type = "nginx_metrics"
  endpoints = ["http://${url}:${port}/basic_status"]
  scrape_interval_secs = ${scrapeIntervalSeconds}

[transforms.nginx_metrics_to_logs]
  type = "metric_to_log"
  inputs = ["nginx_metrics"]

[transforms.nginx_metrics_transform]
  type = "remap"
  inputs = ["nginx_metrics_to_logs"]
  source = '''
  .type = "${VECTOR_NGINX_METRICS_TYPE}"
  '''

[sinks.nginx_metrics_firehose_stream_sink]
  # General
  type = "aws_kinesis_firehose"
  inputs = ["nginx_metrics_transform"]

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

export const buildNginxConfig = (): string => {
  let config = '';

  if (store.Vector.Nginx.monitorMetrics) {
    config += metricConfig();
  }

  if (
    store.Vector.Nginx.monitorAccessLogs ||
    store.Vector.Nginx.monitorErrorLogs
  ) {
    config += logConfig();
  }

  return config;
};
