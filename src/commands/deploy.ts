/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
/* eslint-disable no-console */

import { Command, flags } from '@oclif/command';

import log, { LevelNames } from '../utils/log';
import orchestrator from '../aws/orchestrator';
import { ensureCredentials } from '../utils/aws';
import { alarmEmailsPrompt, confirmAlarms } from '../prompts';
import store from '../store';
import { DENDRO_ASCII_ART } from '../constants';
import { IAMPrompt } from '../prompts/AWS';
import chalk from 'chalk';
import { cli } from 'cli-ux';

export default class DeployCommand extends Command {
  static description = `Deploy the dendro logging pipeline on AWS. Run ${chalk.yellow.bold('configure')} prior to this command otherwise database tables will not be set`;

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

    const parsed = this.parse(DeployCommand);
    const { level } = parsed.flags;
    log.setLevel(level as LevelNames);

    log.info('To make sure you have the right permissions, take a look at this page:');
    cli.url('- AWS IAM Dashboard\n', 'https://console.aws.amazon.com/iam/home?region=us-east-1#/home');

    const iam = await IAMPrompt.run();

    if (!iam) return;

    const alarms = await confirmAlarms.run();
    if (alarms) {
      console.clear();
      store.AWS.SNS.Emails = await alarmEmailsPrompt.run();
    }

    console.clear();

    console.log(DENDRO_ASCII_ART);

    let spinner;
    try {
      spinner = log.spin('Setting up a new role...');
      await orchestrator.createRole();
      spinner.succeed();

      spinner = log.spin('Creating a new bucket...');
      await orchestrator.createBucket();
      spinner.succeed();

      spinner = log.spin('Setting up firehose...');
      await orchestrator.setupFirehose();
      spinner.succeed();

      spinner = log.spin('Setting up timestream...');
      await orchestrator.setupTimestream();
      spinner.succeed();

      spinner = log.spin('Setting up lambda...');
      await orchestrator.setupLambda();
      spinner.succeed();

      if (alarms) {
        spinner = log.spin('Setting up alarms...');
        await orchestrator.setupAlarms();
        spinner.succeed();
      }

    } catch (error) {
      spinner?.fail();
      console.log(error);
    }
  }
}
