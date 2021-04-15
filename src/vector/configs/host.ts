import store from '../../store';

const config = (): string => {
  return `
################ Nginx Logs #############################

[sources.host_metrics]
type = "host_metrics"
collectors = [
  ${store.Vector.Host.cpu ? "cpu," : null}
  ${store.Vector.Host.cpu ? "disk," : null}
  ${store.Vector.Host.cpu ? "filesystem," : null}
  ${store.Vector.Host.cpu ? "load," : null}
  ${store.Vector.Host.cpu ? "host," : null}
  ${store.Vector.Host.cpu ? "memory," : null}
  ${store.Vector.Host.cpu ? "network," : null}
]
scrape_interval_secs = ${store.Vector.Host.scrapeIntervalSeconds}

[transforms.host_metrics_to_logs]
  type = "metric_to_log"
  inputs = ["host_metrics"]

[transforms.host_metrics_transform]
  type = "remap"
  inputs = ["host_metrics_to_logs"]
  source = '''
  .type = "host-metrics"
  '''

[sinks.host_metrics_firehose_stream_sink]
  # General
  type = "aws_kinesis_firehose"
  inputs = ["host_metrics_transform"]

  # AWS
  region = "us-east-2", required when endpoint = null
  stream_name = "HostMetricsDendroStream"

  ## Auth
  auth.access_key_id = "${store.AWS.Credentials.accessKeyId}"
  auth.secret_access_key = "${store.AWS.Credentials.secretAccessKey}"

  # Encoding
  encoding.codec = "json"

#############################################
`;
};

export const buildHostConfig = (): string => {
  if (store.Vector.Host.shouldBuildConfig()) {
    return config();
  }

  return '';
};
