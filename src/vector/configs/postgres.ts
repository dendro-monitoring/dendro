import globalState from '../../state/globalState'

const logConfig = () => {
  return `
\n################ Postgres Logs #############################

[sources.nginx_access_logs]
type = "file"
include = ["/var/log/postgresql/*.log"]
read_from = "beginning"
ignore_checkpoints = true

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
stream_name = "DendroTestStream" # required
auth.access_key_id = "${globalState.AWS.accessKeyId}"
auth.secret_access_key = "${globalState.AWS.secretAccessKey}"
# Encoding
encoding.codec = "json" # required
# Healthcheck
healthcheck.enabled = true # optional, default

#############################################\n
    `
}

const metricConfig = () => {}

export const buildConfig = () => {
  let config = ''

  if (globalState.Vector.Postgres?.monitorMetrics) {
    config += metricConfig()
  }

  if (globalState.Vector.Postgres?.monitorErrorLogs) {
    config += logConfig()
  }

  return config
}
