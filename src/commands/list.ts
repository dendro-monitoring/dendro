/* eslint-disable max-lines-per-function */
import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';

import log, { LevelNames } from '../utils/log';
import AWSWrapper from '../aws';
import chalk from 'chalk';
import ora from 'ora';
import { ALL_TIMESTREAM_DATABASE_TABLES, AWS_FIREHOSE_STREAM_NAME, AWS_IAM_ROLE_NAME, AWS_LAMBDA_FUNCTION_NAME, AWS_S3_BUCKET_PREFIX, AWS_TIMESTREAM_DATABASE_NAME } from '../constants';
import { ensureCredentials } from '../utils/aws';

export default class ListCommand extends Command {
  static description = 'describe the command here';

  static examples = [
    `$ dendro list
Roles
Buckets
Firehose streams
Lambda
Timestream
`,
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    // name: flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    // force: flags.boolean({ char: 'f' }),
    level: flags.string({
      char: 'L',
      description: 'set the log level',
      options: [
        'debug',
        'info',
        'warn',
        'error',
        'fatal',
      ],
      default: 'info',
    }),
  };

  static args = [];

  async printRoles(roles: { RoleName: string }[], callback: (msg: string) => void): Promise<void> {
    callback(chalk.bold("Role:"));

    if (roles.length === 0) {
      log.info('No role found!');
      return;
    }

    for await (const role of roles) {
      if (role.RoleName !== AWS_IAM_ROLE_NAME) {
        continue;
      }

      await cli.url(
        `- ${role.RoleName}`,
        `https://console.aws.amazon.com/iam/home?region=us-east-1#/roles/${role.RoleName}`
      );
    }
    console.log('\n');
  }

  async printBuckets(buckets: { Name: string }[], callback: (msg: string) => void): Promise<void> {
    callback(chalk.bold("Bucket:"));

    if (buckets.length === 0) {
      log.info('No bucket found!');
      return;
    }

    for await (const bucket of buckets) {
      if (!bucket.Name.includes(AWS_S3_BUCKET_PREFIX)) {
        continue;
      }

      await cli.url(
        `- ${bucket.Name}`,
        `https://s3.console.aws.amazon.com/s3/buckets/${bucket.Name}?region=us-east-2&tab=objects`
      );
    }
    console.log('\n');
  }

  async printDeliveryStreams(streams: string[], callback: (msg: string) => void): Promise<void> {
    callback(chalk.bold('Firehose Stream:'));

    if (streams.length === 0) {
      log.info('No stream found!');
      return;
    }

    for await (const stream of streams) {
      if (stream !== AWS_FIREHOSE_STREAM_NAME) {
        continue;
      }

      await cli.url(`- ${stream}`, `https://console.aws.amazon.com/firehose/home?region=us-east-1#/details/${stream}`);
    }
    console.log('\n');
  }

  async printLambdas(lambdas: { FunctionName: string }[], callback: (msg: string) => void): Promise<void> {
    callback(chalk.bold('Lambda:'));

    if (lambdas.length === 0) {
      log.info('No lambda found!');
      return;
    }

    for await (const lambda of lambdas) {
      if (lambda.FunctionName !== AWS_LAMBDA_FUNCTION_NAME) {
        continue;
      }

      await cli.url(
        `- ${lambda.FunctionName}`,
        `https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions/${lambda.FunctionName}?tab=code`
      );
    }

    console.log('\n');
  }

  async printTimestream(streams: { DatabaseName: string }[], callback: (msg: string) => void): Promise<void> {
    callback(chalk.bold('Timestream Database:'));

    if (streams.length === 0) {
      log.info('No timestream database found!');
      return;
    }

    for await (const stream of streams) {
      if (stream.DatabaseName !== AWS_TIMESTREAM_DATABASE_NAME) {
        continue;
      }

      await cli.url(
        `- ${stream.DatabaseName}`,
        `https://console.aws.amazon.com/timestream/home?region=us-east-1#databases/${stream.DatabaseName}`
      );
    }
    console.log('\n');
  }

  async printTimestreamTables(tables: { TableName: string }[], callback: (msg: string) => void): Promise<void> {
    callback(chalk.bold('Timestream Tables:'));

    if (!tables || tables.length === 0) {
      log.info('No timestream tables found!');
      return;
    }

    for await (const table of tables) {
      if (!ALL_TIMESTREAM_DATABASE_TABLES.includes(table.TableName)) {
        continue;
      }

      await cli.url(
        `- ${table.TableName}`,
        `https://console.aws.amazon.com/timestream/home?region=us-east-1#databases/DendroTimestreamDB/tables/${table.DatabaseName}`
      );
    }
  }

  async run() {
    ensureCredentials();

    const parsed = this.parse(ListCommand);
    const { level } = parsed.flags;
    log.setLevel(level as LevelNames);
    let spinner: ora.Ora | undefined;
    const callback = (msg: string) => spinner?.succeed(msg);

    spinner = log.spin('Listing role...');
    const Roles = await AWSWrapper.listRoles();
    await this.printRoles(Roles, callback);

    spinner = log.spin('Listing S3 bucket...');
    const { Buckets } = await AWSWrapper.listBuckets();
    await this.printBuckets(Buckets, callback);

    spinner = log.spin('Listing Firehose stream...\n');
    const { DeliveryStreamNames } = await AWSWrapper.listDeliveryStreams();
    await this.printDeliveryStreams(DeliveryStreamNames, callback);

    spinner = log.spin('Listing Lambda function...\n');
    const { Functions } = await AWSWrapper.listFunctions();
    await this.printLambdas(Functions, callback);

    spinner = log.spin('Listing Timestream database...\n');
    const { Databases } = await AWSWrapper.listDatabases();
    await this.printTimestream(Databases, callback);

    spinner = log.spin('Listing Timestream tables...\n');
    const Tables = await AWSWrapper.listTables();
    await this.printTimestreamTables(Tables.Tables, callback);
  }
}
