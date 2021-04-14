import globalState from '../../state/globalState'

export default {
  accessLogs: () => {
    return `
################ Nginx Logs #############################

[sources.nginx_access_logs]
type = "file"
include = [
  ${globalState.Vector.Nginx.accessLog ? '"/var/log/nginx/access_log.log",' : null}
  ${globalState.Vector.Nginx.errorLog ? '"/var/log/nginx/error_log.log"' : null}
]
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

#############################################
    `
  },
}
