/* eslint-disable max-lines-per-function */
const { Command, flags } = require('@oclif/command');

const log = require("../utils/log");
const orchestrator = require('../orchestrator');

const NEW_BUCKET_NAME = 'dendrodefaultbucket';

// TODO put & use constants in globalState. Right now, constants aren't being shared between services
//  so the connections are broken

class TestCommand extends Command {
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
    log.default.setLevel(level);
    let spinner;
    try {
      spinner = log.default.spin('Setting up a new role...');
      const newRole = await orchestrator.createRole();
      spinner.succeed();

      spinner = log.default.spin('Creating a new bucket...');
      await orchestrator.createBucket(NEW_BUCKET_NAME);
      spinner.succeed();

      // spinner = log.default.spin('Setting up firehose...');
      // await orchestrator.setupFirehose(newRole);
      // spinner.succeed();

      // spinner = log.default.spin('Setting up timestream...');
      // await orchestrator.setupTimestream();
      // spinner.succeed();


      // spinner = log.default.spin('Setting up lambda...');
      // const lambdaData = await orchestrator.setupLambda(newRole);
      // spinner.succeed();

      // spinner = log.default.spin('Linking bucket to lambda...');
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

TestCommand.flags = {
  name: flags.string({ char: 'n', description: 'name to print' }),
};

module.exports = TestCommand;
