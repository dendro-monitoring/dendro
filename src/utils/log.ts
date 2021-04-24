import ora from 'ora';
import chalk from 'chalk';
import cli from 'cli-ux';

import { ALL_TIMESTREAM_DATABASE_TABLES, AWS_FIREHOSE_STREAM_NAME, AWS_IAM_ROLE_NAME, AWS_LAMBDA_FUNCTION_NAME, AWS_S3_BUCKET_PREFIX, AWS_TIMESTREAM_DATABASE_NAME } from '../constants';

export type LevelNames = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export enum Level {
  Debug = 0,
  Info = 1,
  Warn = 2,
  Error = 3,
  Fatal = 4,
}

interface SpinnerOpts {
  color: ora.Color;
}

export class Logger {
  #level: Level = Level.Info;

  setLevel(level: LevelNames): void {
    switch (level) {
      case 'debug':
        this.#level = Level.Debug;
        break;
      case 'info':
        this.#level = Level.Info;
        break;
      case 'warn':
        this.#level = Level.Warn;
        break;
      case 'error':
        this.#level = Level.Error;
        break;
      case 'fatal':
        this.#level = Level.Fatal;
        break;
    }
  }

  /**
   * Log to stdout and create a spinner.
   *
   * ```
   * const spinner = log.spin('Hello world', { color: 'yellow' })
   * try {
   *   // do some task
   *   spinner.succeed()
   * } catch (e) {
   *   spinner.fail(e.msg)
   * }
   * ```
   */
  spin(
    msg: string,
    opts?: SpinnerOpts,
  ): ora.Ora {
    const spinner = ora(msg);
    spinner.color = opts?.color || 'cyan';
    return spinner.start();
  }

  debug(msg: string): void {
    if (this.#level <= Level.Debug) {
      console.log(chalk.bold.blue('DEBUG'), msg);
    }
  }

  info(msg: string): void {
    if (this.#level <= Level.Info) {
      // console.log(chalk.green('INFO'), ...args)
      ora().info(msg);
    }
  }

  warn(msg: string): void {
    if (this.#level <= Level.Warn) {
      // console.log(chalk.yellow('WARN'), ...args);
      ora().warn(chalk.bold.yellow(msg));
    }
  }

  error(msg: string): void {
    if (this.#level <= Level.Error) {
      // console.log(chalk.red('ERROR'), ...args)
      ora().fail(chalk.bold.red(msg));
    }
  }

  fatal({ msg, err }: {msg: string; err?: string}): void {
    if (this.#level <= Level.Fatal) {
      console.log(chalk.bold.red('FATAL'), msg);
      throw new Error(err || 'Some error occurred.');
    }
  }
}

const log = new Logger();

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

export default log;
