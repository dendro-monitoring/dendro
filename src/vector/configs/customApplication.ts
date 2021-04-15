import globalState from '../../globalState';
import { CustomApplicationData } from '../../globalState/vector/customApplication';

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
auth.access_key_id = "${globalState.AWS.Credentials?.accessKeyId}"
auth.secret_access_key = "${globalState.AWS.Credentials?.secretAccessKey}"

# Encoding
encoding.codec = "json"

# Healthcheck
healthcheck.enabled = true # optional, default

#############################################
`;
};

export const buildCustomApplications = (): string => {
  let config = '';

  if (globalState.Vector.CustomApplications) {
    globalState.Vector.CustomApplications.forEach(customApp => {
      config += logConfig(customApp);
    });
  }

  return config;
};
