import store from '../../store';
import log from '../../utils/log';
import trim from '../../utils/trim';
import { CustomApplicationData } from '../../store/vector/customApplication';
import {
  AWS_REGION,
  AWS_FIREHOSE_STREAM_NAME,
  VECTOR_CUSTOM_APPLICATION_TYPE
} from '../../constants';

const logConfig = ({ name, filepath }: CustomApplicationData): string => {
  log.debug(`Writing custom application vector log config for application ${name}`);
  return `
################ ${name} - Custom Application #############################

[sources.custom_application_${name}_logs]
  type = "file"
  include = ["${trim(filepath)}"]
  read_from = "beginning"

[transforms.custom_application_${name}_transform]
  type = "remap"
  inputs = ["custom_application_${name}_logs"]
  source = '''
  .type = "${VECTOR_CUSTOM_APPLICATION_TYPE}"
  '''

[sinks.custom_application_${name}_logs_firehose_stream_sink]
  # General
  type = "aws_kinesis_firehose"
  inputs = ["custom_application_${name}_transform"]

  # AWS
  region = "${AWS_REGION}"
  stream_name = "${AWS_FIREHOSE_STREAM_NAME}"

  ## Auth
  auth.access_key_id = "${store.AWS.Credentials?.accessKeyId}"
  auth.secret_access_key = "${store.AWS.Credentials?.secretAccessKey}"

  # Encoding
  encoding.codec = "json"

  # Healthcheck
  healthcheck.enabled = true # optional, default

#############################################
`;
};

export const buildCustomApplications = (): string => {
  let config = '';

  if (store.Vector.CustomApplications) {
    store.Vector.CustomApplications.forEach(customApp => {
      config += logConfig(customApp);
    });
  }

  return config;
};
