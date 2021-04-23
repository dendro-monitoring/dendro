import AWS = require('aws-sdk');

import { ensureCredentials } from '../../utils/aws';

import store from '../../store';

import { AWS_REGION } from '../../constants';

export async function setCredentials(): Promise<void> {
  await ensureCredentials();
  AWS.config.update({
    accessKeyId: store.AWS.Credentials.accessKeyId,
    secretAccessKey: store.AWS.Credentials.secretAccessKey,
  });
}

export const iam = new AWS.IAM();
export const cloudwatch = new AWS.CloudWatchLogs({ region: AWS_REGION });
export const firehose = new AWS.Firehose({ region: AWS_REGION });
export const lambda = new AWS.Lambda({ region: AWS_REGION });
export const s3 = new AWS.S3();
export const timestreamWrite = new AWS.TimestreamWrite({ region: AWS_REGION });
export const timestreamQuery = new AWS.TimestreamQuery({ region: AWS_REGION });

