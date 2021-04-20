export default {
  LAMBDA_POLICY_ARN:  'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
  FIREHOSE_POLICY_ARN:  'arn:aws:iam::aws:policy/AmazonKinesisFirehoseFullAccess',
  TIMESTREAM_POLICY_ARN:  'arn:aws:iam::aws:policy/AmazonTimestreamFullAccess',
  S3_POLICY_ARN:  'arn:aws:iam::aws:policy/AmazonS3FullAccess',
};

export const AWS_REGION = 'us-east-2';
export const AWS_FIREHOSE_STREAM_NAME = "DendroFirehoseStream";
export const AWS_S3_BUCKET_NAME = "DendroS3Bucket";
export const AWS_TIMESTREAM_DATABASE_NAME = "DendroTimestreamDB";
export const AWS_IAM_ROLE_NAME ="dendro-s3-lambda-role";
