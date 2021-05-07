/* eslint-disable max-lines-per-function */
import { Command, flags } from '@oclif/command';

import log, { LevelNames } from '../utils/log';
import AWSWrapper from '../aws';
import ora from 'ora';
import { ensureCredentials } from '../utils/aws';
import {
  logRoles,
  logBuckets,
  logDeliveryStream,
  logLambdas,
  logTimestream,
  logTimestreamTables,
  logTopic
} from '../utils/list';
import { DENDRO_ASCII_ART } from '../constants';

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
    // name: flags.string({ char: 'n', description: 'name to log' }),
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

  async run(): Promise<void> {
    ensureCredentials();

    const parsed = this.parse(ListCommand);
    const { level } = parsed.flags;
    log.setLevel(level as LevelNames);

    console.clear();
    console.log(DENDRO_ASCII_ART);

    let spinner: ora.Ora | undefined;
    const callback = (msg: string) => spinner?.succeed(msg);

    spinner = log.spin('Listing role...');
    const Roles = await AWSWrapper.listRoles();
    await logRoles(Roles, callback);

    spinner = log.spin('Listing S3 bucket...');
    const Buckets = await AWSWrapper.listBuckets();
    await logBuckets(Buckets, callback);

    spinner = log.spin('Listing Firehose stream...\n');
    const DeliveryStreamNames = await AWSWrapper.describeDeliveryStream();
    await logDeliveryStream(DeliveryStreamNames, callback);

    spinner = log.spin('Listing Lambda function...\n');
    const Functions = await AWSWrapper.listFunctions();
    await logLambdas(Functions, callback);

    spinner = log.spin('Listing Timestream database...\n');
    const Databases = await AWSWrapper.listDatabases();
    await logTimestream(Databases, callback);

    if (Databases.length > 0) {
      spinner = log.spin('Listing Timestream tables...\n');
      const Tables = await AWSWrapper.listTables();
      await logTimestreamTables(Tables, callback);
    }

    const topics = await AWSWrapper.listTopics();
    await logTopic(topics, callback)
  }
}
