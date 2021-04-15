import globalState from '../../globalState';

const config = (): string => {
  return `
################ Nginx Logs #############################

[sources.host_metrics]
type = "host_metrics"
collectors = [
  ${globalState.Vector.Host.cpu ? "cpu," : null}
  ${globalState.Vector.Host.cpu ? "disk," : null}
  ${globalState.Vector.Host.cpu ? "filesystem," : null}
  ${globalState.Vector.Host.cpu ? "load," : null}
  ${globalState.Vector.Host.cpu ? "host," : null}
  ${globalState.Vector.Host.cpu ? "memory," : null}
  ${globalState.Vector.Host.cpu ? "network," : null}
]
scrape_interval_secs = ${globalState.Vector.Host.scrapeIntervalSeconds}

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
  auth.access_key_id = "${globalState.AWS.Credentials.accessKeyId}"
  auth.secret_access_key = "${globalState.AWS.Credentials.secretAccessKey}"

  # Encoding
  encoding.codec = "json"

#############################################
`;
};

export const buildHostConfig = (): string => {
  if (globalState.Vector.Host.shouldBuildConfig()) {
    return config();
  }

  return '';
};
