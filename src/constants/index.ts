export default {
  LAMBDA_POLICY_ARN:  'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
  FIREHOSE_POLICY_ARN:  'arn:aws:iam::aws:policy/AmazonKinesisFirehoseFullAccess',
  TIMESTREAM_POLICY_ARN:  'arn:aws:iam::aws:policy/AmazonTimestreamFullAccess',
  S3_POLICY_ARN:  'arn:aws:iam::aws:policy/AmazonS3FullAccess',
};

export const AWS_REGION = 'us-east-2';
