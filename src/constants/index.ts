export default {
  LAMBDA_POLICY_ARN:  'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
  FIREHOSE_POLICY_ARN:  'arn:aws:iam::aws:policy/AmazonKinesisFirehoseFullAccess',
  TIMESTREAM_POLICY_ARN:  'arn:aws:iam::aws:policy/AmazonTimestreamFullAccess',
  S3_POLICY_ARN:  'arn:aws:iam::aws:policy/AmazonS3FullAccess',
};

export const AWS_REGION = 'us-east-2';
export const AWS_FIREHOSE_STREAM_NAME = "DendroFirehoseStream";
export const AWS_S3_BUCKET_NAME = "dendro-s3-bucket-" + Math.random().toString(36).substring(2);
export const AWS_TIMESTREAM_DATABASE_NAME = "DendroTestDb";
export const AWS_IAM_ROLE_NAME ="dendro-s3-lambda-role";

export const VECTOR_APACHE_LOGS_TYPE = "apache-logs";
export const VECTOR_APACHE_METRICS_TYPE = "apache-metrics";
export const VECTOR_CUSTOM_APPLICATION_TYPE = "custom-application";
export const VECTOR_HOST_METRICS_TYPE = "host-metrics";
export const VECTOR_MONGO_LOGS_TYPE = "mongo-logs";
export const VECTOR_MONGO_METRICS_TYPE = "mongo-metrics";
export const VECTOR_NGINX_LOGS_TYPE = "nginx-logs";
export const VECTOR_NGINX_METRICS_TYPE = "nginx-metrics";
export const VECTOR_POSTGRES_LOGS_TYPE = "postgres-logs";
export const VECTOR_POSTGRES_METRICS_TYPE = "postgres-metrics";
