import store from '../../store';
import log from '../../utils/log';
import {
  AWS_REGION,
  AWS_FIREHOSE_STREAM_NAME,
  VECTOR_HOST_METRICS_TYPE,
} from '../../constants';

const config = (): string => {
  log.debug('Writing Host vector log config');
  return `
################ Host Logs #############################

[sources.host_metrics]
type = "host_metrics"
collectors = [
  ${store.Vector.Host.cpu ? '"cpu",' : ''}
  ${store.Vector.Host.disk ? '"disk",' : ''}
  ${store.Vector.Host.filesystem ? '"filesystem",' : ''}
  ${store.Vector.Host.load ? '"load",' : ''}
  ${store.Vector.Host.host ? '"host",' : ''}
  ${store.Vector.Host.memory ? '"memory",' : ''}
  ${store.Vector.Host.network ? '"network",' : ''}
]
scrape_interval_secs = ${store.Vector.Host.scrapeIntervalSeconds}

[transforms.host_metrics_to_logs]
  type = "metric_to_log"
  inputs = ["host_metrics"]

[transforms.host_metrics_transform]
  type = "remap"
  inputs = ["host_metrics_to_logs"]
  source = '''
  .type = "${VECTOR_HOST_METRICS_TYPE}"
  '''

[sinks.host_metrics_firehose_stream_sink]
  # General
  type = "aws_kinesis_firehose"
  inputs = ["host_metrics_transform"]

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

export const buildHostConfig = (): string => {
  if (store.Vector.Host.isMonitored()) {
    return config();
  }

  return '';
};
