/* eslint-disable max-len */
/* eslint-disable no-console */

import { Command, flags } from '@oclif/command';

import log, { LevelNames } from "../utils/log";
import orchestrator from '../aws/orchestrator';

export default class DeployCommand extends Command {
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
  async run() {
    const parsed = this.parse(DeployCommand);
    const { level } = parsed.flags;
    log.setLevel(level as LevelNames);
    let spinner;
    try {
      spinner = log.spin('Setting up a new role...');
      await orchestrator.createRole();
      spinner.succeed();

      spinner = log.spin('Creating a new bucket...');
      await orchestrator.createBucket();
      await orchestrator.putS3Lifecycle();
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

    } catch (error) {
      spinner?.fail();
      console.log(error);
    }
  }
}

DeployCommand.description = `Describe the command here
...
Extra documentation goes here
`;
