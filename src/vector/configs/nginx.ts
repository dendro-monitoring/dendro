import globalState from '../../globalState';

const logConfig = (): string => {
  return `
################ Nginx Logs #############################

[sources.nginx_logs]
type = "file"
include = [
  ${globalState.Vector.Nginx.monitorAccessLogs ? '"/var/log/nginx/access_log.log",' : null}
  ${globalState.Vector.Nginx.monitorErrorLogs ? '"/var/log/nginx/error_log.log"' : null}
]
read_from = "beginning"

[transforms.nginx_logs_transform]
type = "remap"
inputs = ["nginx_logs"]
source = '''
.type = "nginx-logs"
'''

[sinks.nginx_logs_firehose_stream_sink]
# General
type = "aws_kinesis_firehose"
inputs = ["nginx_logs_transform"]

# AWS
region = "us-east-2", required when endpoint = null
stream_name = "NginxLogsDendroStream"

## Auth
auth.access_key_id = "${globalState.AWS.Credentials.accessKeyId}"
auth.secret_access_key = "${globalState.AWS.Credentials.secretAccessKey}"

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
  } = globalState.Vector.Nginx;

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
  .type = "nginx-metrics"
  '''

[sinks.nginx_metrics_firehose_stream_sink]
  # General
  type = "aws_kinesis_firehose"
  inputs = ["nginx_metrics_transform"]

  # AWS
  region = "us-east-2"
  stream_name = "NginxMetricsDendroStream"

  ## Auth
  auth.access_key_id = "${globalState.AWS.Credentials.accessKeyId}"
  auth.secret_access_key = "${globalState.AWS.Credentials.secretAccessKey}"

  # Encoding
  encoding.codec = "json"

#############################################
`;
};

export const buildNginxConfig = (): string => {
  let config = '';

  if (globalState.Vector.Nginx.monitorMetrics) {
    config += metricConfig();
  }

  if (
    globalState.Vector.Nginx.monitorAccessLogs ||
    globalState.Vector.Nginx.monitorErrorLogs
  ) {
    config += logConfig();
  }

  return config;
};
