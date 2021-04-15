import store from '../../store';

const logConfig = (): string => {
  return `
\n################ Nginx Logs #############################

[sources.nginx_access_logs]
type = "file"
include = [
  ${store.Vector.Nginx.monitorAccessLogs ? '"/var/log/nginx/access_log.log",' : null}
  ${store.Vector.Nginx.monitorErrorLogs ? '"/var/log/nginx/error_log.log"' : null}
]
read_from = "beginning"

[transforms.nginx_access_logs_add_transform]
type = "remap"
inputs = ["nginx_access_logs"]
source = '''
.type = "nginx-access"
'''

[sinks.nginx_access_logs_firehose_stream_sink]
# General
type = "aws_kinesis_firehose" # required
inputs = ["nginx_access_logs_add_transform"] # required
region = "us-east-2" # required, required when endpoint = null
stream_name = "NginxDendroStream" # required
auth.access_key_id = "${store.AWS.Credentials.accessKeyId}"
auth.secret_access_key = "${store.AWS.Credentials.secretAccessKey}"
# Encoding
encoding.codec = "json" # required
# Healthcheck
healthcheck.enabled = true # optional, default

#############################################\n
    `;
};

// TODO
const metricConfig = (): string => {
  console.log('Not Implemented');
  return '';
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
