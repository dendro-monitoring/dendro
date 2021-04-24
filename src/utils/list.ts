import chalk from 'chalk';
import cli from 'cli-ux';

import log from './log';
import { ALL_TIMESTREAM_DATABASE_TABLES } from '../constants';

export async function logRoles(roles: { RoleName: string}[], callback: (msg: string) => void): Promise<void> {
  callback(chalk.bold('Role:'));

  if (roles.length === 0) {
    log.info('No role found!');
    return;
  }

  for await (const role of roles) {
    cli.url(
      `- ${role.RoleName}`,
      `https://console.aws.amazon.com/iam/home?region=us-east-1#/roles/${role.RoleName}`
    );
  }

  console.log('\n');
}

export async function logBuckets(buckets: { Name: string}[], callback: (msg: string) => void): Promise<void> {
  callback(chalk.bold('Bucket:'));

  if (buckets.length === 0) {
    log.info('No bucket found!');
    return;
  }

  for (const bucket of buckets) {
    cli.url(
      `- ${bucket.Name}`,
      `https://s3.console.aws.amazon.com/s3/buckets/${bucket.Name}?region=us-east-2&tab=objects`
    );
  }
  console.log('\n');
}

export async function logDeliveryStreams(streams: string[], callback: (msg: string) => void): Promise<void> {
  callback(chalk.bold('Firehose Stream:'));

  if (streams.length === 0) {
    log.info('No stream found!');
    return;
  }

  for await (const stream of streams) {
    cli.url(`- ${stream}`, `https://console.aws.amazon.com/firehose/home?region=us-east-1#/details/${stream}`);
  }
  console.log('\n');
}

export async function logLambdas(lambdas: { FunctionName: string }[], callback: (msg: string) => void): Promise<void> {
  callback(chalk.bold('Lambda:'));

  if (lambdas.length === 0) {
    log.info('No lambda found!');
    return;
  }

  for await (const lambda of lambdas) {
    cli.url(
      `- ${lambda.FunctionName}`,
      `https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions/${lambda.FunctionName}?tab=code`
    );
  }

  console.log('\n');
}

export async function logTimestream(streams: { DatabaseName: string }[], callback: (msg: string) => void): Promise<void> {
  callback(chalk.bold('Timestream Database:'));

  if (streams.length === 0) {
    log.info('No timestream database found!');
    return;
  }

  for await (const stream of streams) {
    cli.url(
      `- ${stream.DatabaseName}`,
      `https://console.aws.amazon.com/timestream/home?region=us-east-1#databases/${stream.DatabaseName}`
    );
  }
  console.log('\n');
}

export async function logTimestreamTables(tables: { TableName: string, DatabaseName: string }[], callback: (msg: string) => void): Promise<void> {
  callback(chalk.bold('Timestream Tables:'));

  if (!tables || tables.length === 0) {
    log.info('No timestream tables found!');
    return;
  }

  for await (const table of tables) {
    if (!ALL_TIMESTREAM_DATABASE_TABLES.includes(table.TableName)) {
      continue;
    }

    cli.url(
      `- ${table.TableName}`,
      `https://console.aws.amazon.com/timestream/home?region=us-east-1#databases/DendroTimestreamDB/tables/${table.TableName}`
    );
  }
}
