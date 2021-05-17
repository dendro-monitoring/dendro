import { Command, flags } from '@oclif/command';
import orchestrator from '../aws/orchestrator';
import log, { LevelNames } from '../utils/log';
import { ensureCredentials } from '../utils/aws';
import AWSWrapper from '../aws';
const { Confirm } = require('enquirer');
import {
  logRoles,
  logBuckets,
  logDeliveryStream,
  logLambdas,
  logTimestream,
  logTimestreamTables,
  logTopic,
} from '../utils/list';

function noResourcesFound(roles: Array<any>, buckets: Array<any>, streams: Array<any>, functions: Array<any>, databases: Array<any>, topics: Array<any>): boolean {
  return roles.length === 0
    && buckets.length === 0
    && streams.length === 0
    && functions.length === 0
    && databases.length === 0
    && topics.length === 0;
}

export default class Teardown extends Command {
  static description = 'Permanently deletes the logging pipeline deployed on AWS';

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

  async run(): Promise<void> {
    ensureCredentials();
    const parsed = this.parse(Teardown);
    const { level } = parsed.flags;
    log.setLevel(level as LevelNames);
    let spinner;

    try {

      const callback = (msg: string) => console.log(msg);

      const Roles = await AWSWrapper.listRoles();
      await logRoles(Roles, callback);

      const Buckets = await AWSWrapper.listBuckets();
      await logBuckets(Buckets, callback);

      const DeliveryStreamNames = await AWSWrapper.describeDeliveryStream();
      await logDeliveryStream(DeliveryStreamNames, callback);

      const Functions = await AWSWrapper.listFunctions();
      await logLambdas(Functions, callback);

      const Databases = await AWSWrapper.listDatabases();
      await logTimestream(Databases, callback);

      if (Databases.length > 0) {
        const Tables = await AWSWrapper.listTables();
        await logTimestreamTables(Tables, callback);
      }

      const Topics = await AWSWrapper.listTopics();
      await logTopic(Topics, callback);

      if (noResourcesFound(Roles, Buckets, DeliveryStreamNames, Functions, Databases, Topics)) return log.info('No resources to delete');

      const prompt = new Confirm({
        name: 'confirm-delete',
        message: 'Do you want to proceed with deleting the above resources?'
      });

      const choice = await prompt.run();

      if (!choice) return;

      if (Databases.length > 0) {
        spinner = log.spin('Deleting timestream...');
        await orchestrator.deleteTimestream();
        spinner.succeed();
      }

      if (Roles.length > 0) {
        spinner = log.spin('Deleting role...');
        const roleError = await orchestrator.deleteRole();
        if (roleError) {
          log.warn('Couldn\'t delete role: No such role exists');
        }
        spinner.succeed();
      }

      if (Buckets.length > 0) {
        spinner = log.spin('Deleting bucket...');
        const bucketError = await orchestrator.deleteBucket();
        if (bucketError) {
          log.warn('Couldn\'t delete bucket: No such bucket exists');
        }
        spinner.succeed();
      }

      if (DeliveryStreamNames) {
        spinner = log.spin('Deleting firehose...');
        const firehoseError = await orchestrator.deleteFirehose();
        if (firehoseError) {
          log.warn('Couldn\'t delete firehose: No such stream name exists');
        }
        spinner.succeed();
      }

      if (Functions.length > 0) {
        spinner = log.spin('Deleting lambda...');
        const lambdaError = await orchestrator.deleteLambda();
        if (lambdaError) {
          log.warn('Couldn\'t delete lambda: No such lambda exists');
        }
        spinner.succeed();
      }

      if (Databases.length > 0) {
        spinner = log.spin('Deleting timestream...');
        await orchestrator.deleteTimestream();
        spinner.succeed();
      }

      if (Topics.length > 0) {
        spinner = log.spin('Deleting alarms...');
        await orchestrator.deleteAlarms(Topics[0]);
        spinner.succeed();
      }

    } catch (error) {
      spinner?.fail();
      console.log(error);
    }
  }
}
