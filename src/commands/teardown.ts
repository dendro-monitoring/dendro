import AWS = require('aws-sdk');
// import { AWSError, IAM } from 'aws-sdk';
import { Command, flags } from '@oclif/command';
import orchestrator from '../aws/orchestrator';
import log, { LevelNames } from "../utils/log";
import { ensureCredentials } from '../utils/aws';
import {
  ALL_TIMESTREAM_DATABASE_TABLES,
  AWS_FIREHOSE_STREAM_NAME,
  AWS_IAM_ROLE_NAME,
  AWS_LAMBDA_FUNCTION_NAME,
  AWS_S3_BUCKET_NAME,
  AWS_S3_BUCKET_PREFIX,
  AWS_TIMESTREAM_DATABASE_NAME,
  AWS_REGION
} from '../constants';
import AWSWrapper from '../aws';
import chalk from 'chalk';
import cli from 'cli-ux';
const { Confirm } = require('enquirer');

// const firehose = new AWS.Firehose();
// const lambda = new AWS.Lambda();
// const s3 = new AWS.S3();
// const iam = new AWS.IAM();

export default class Teardown extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
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

  async printRoles(roles: { RoleName: string }[], callback: (msg: string) => void): Promise<void> {
    callback(chalk.bold("Role:"));

    if (roles.length === 0 || roles.filter(role => role.RoleName === AWS_IAM_ROLE_NAME).length === 0) {
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

  }

  async printDeliveryStreams(streams: string[], callback: (msg: string) => void): Promise<void> {
    callback(chalk.bold("Firehose Stream:"));

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
  }

  async printTimestream(streams: { DatabaseName: string }[], callback: (msg: string) => void): Promise<void> {
    callback(chalk.bold("Timestream Database:"));

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
  }

  async printTimestreamTables(tables: { TableName: string }[], callback: (msg: string) => void): Promise<void> {
    callback(chalk.bold("Timestream Tables:"));

    if (tables.length === 0) {
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
    AWS.config.update({ region: AWS_REGION });
    const parsed = this.parse(Teardown);
    const { level } = parsed.flags;
    log.setLevel(level as LevelNames);
    let spinner;

    try {

      const callback = (msg: string) => console.log(msg);

      const Roles = await AWSWrapper.listRoles();
      await this.printRoles(Roles, callback);

      const { Buckets } = await AWSWrapper.listBuckets();
      await this.printBuckets(Buckets, callback);

      const { DeliveryStreamNames } = await AWSWrapper.listDeliveryStreams();
      await this.printDeliveryStreams(DeliveryStreamNames, callback);

      const { Functions } = await AWSWrapper.listFunctions();
      await this.printLambdas(Functions, callback);

      const { Databases } = await AWSWrapper.listDatabases();
      await this.printTimestream(Databases, callback);

      // const { Tables } = await AWSWrapper.listTables();
      // await this.printTimestreamTables(Tables, callback);

      const prompt = new Confirm({
        name: 'confirm-delete',
        message: 'Do you want to proceed with deleting the above resources?'
      });

      const choice = await prompt.run();

      if (!choice) return;

      spinner = log.spin('Deleting role...');
      const roleError = await orchestrator.deleteRole();
      if (roleError) {
        log.warn("Couldn't delete role: No such role exists");
      }
      spinner.succeed();

      spinner = log.spin('Deleting bucket...');
      const bucketError = await orchestrator.deleteBucket();
      if (bucketError) {
        log.warn("Couldn't delete bucket: No such bucket exists");
      }
      spinner.succeed();

      spinner = log.spin('Deleting firehose...');
      const firehoseError = await orchestrator.deleteFirehose();
      if (firehoseError) {
        log.warn("Couldn't delete firehose: No such stream name exists");
      }
      spinner.succeed();

      spinner = log.spin('Deleting lambda...');
      const lambdaError = await orchestrator.deleteLambda();
      if (lambdaError) {
        log.warn("Couldn't delete lambda: No such lambda exists");
      }
      spinner.succeed();

      spinner = log.spin('Deleting timestream...');
      await orchestrator.deleteTimestream();
      spinner.succeed();

    } catch (error) {
      spinner?.fail();
      console.log(error);
    }
  }
}
