import store from '../../store';
import { CustomApplicationData } from '../../store/vector/customApplication';

// TODO
const logConfig = ({ name, filepath }: CustomApplicationData): string => {
  return `
################ ${name} - Custom Application #############################

[sources.custom_application_${name}_logs]
  type = "file"
  include = ["${filepath}"]
  read_from = "beginning"

[transforms.custom_application_${name}_transform]
  type = "remap"
  inputs = ["custom_application_${name}_logs"]
  source = '''
  .type = "custom-application"
  '''

[sinks.custom_application_${name}_logs_firehose_stream_sink]
  # General
  type = "aws_kinesis_firehose"
  inputs = ["custom_application_${name}_logs_transform"]

  # AWS
  region = "us-east-2"
  stream_name = "${name}CustomAppDendroStream"

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
