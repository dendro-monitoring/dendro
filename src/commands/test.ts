/* eslint-disable max-len */
/* eslint-disable no-console */

import { Command, flags } from '@oclif/command';

import log, { LevelNames } from "../utils/log";
import orchestrator from '../aws/orchestrator';

// TODO put & use constants in globalState. Right now, constants aren't being shared between services
//  so the connections are broken

export default class TestCommand extends Command {
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
  async run() {
    const parsed = this.parse(TestCommand);
    const { level } = parsed.flags;
    log.setLevel(level as LevelNames);
    let spinner;
    try {
      spinner = log.spin('Setting up a new role...');
      await orchestrator.createRole();
      spinner.succeed();

      // spinner = log.spin('Creating a new bucket...');
      // await orchestrator.createBucket();
      // spinner.succeed();

      // spinner = log.spin('Setting up firehose...');
      // await orchestrator.setupFirehose(newRole);
      // spinner.succeed();

      // spinner = log.spin('Setting up timestream...');
      // await orchestrator.setupTimestream();
      // spinner.succeed();

      spinner = log.spin('Setting up lambda...');
      const lambdaData = await orchestrator.setupLambda();
      spinner.succeed();

      // spinner = log.spin('Linking bucket to lambda...');
      // await orchestrator.linkBucketToLambda(NEW_BUCKET_NAME, lambdaData);
      // spinner.succeed();

    } catch (error) {
      // spinner.fail();
      console.log(error);
    }
  }
}

TestCommand.description = `Describe the command here
...
Extra documentation goes here
`;
