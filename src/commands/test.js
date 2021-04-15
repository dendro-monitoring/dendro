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
    log.setLevel(level);
    let spinner;
    try {
      spinner = log.spin('Setting up a new role...');
      const newRole = await orchestrator.createRole();
      spinner.success();

      spinner = log.spin('Creating a new bucket...');
      await orchestrator.createBucket(NEW_BUCKET_NAME);
      spinner.success();
      
      spinner = log.spin('Creating a new bucket...');
      await orchestrator.setupFirehose(newRole);
      spinner.success();

      spinner = log.spin('Creating a new bucket...');
      await orchestrator.setupTimestream();
      spinner.success();

      
      spinner = log.spin('Creating a new bucket...');
      const lambdaData = await orchestrator.setupLambda(newRole);
      spinner.success();

      spinner = log.spin('Creating a new bucket...');
      await orchestrator.linkBucketToLambda(NEW_BUCKET_NAME, lambdaData);
      spinner.success();

    } catch (error) {
      spinner.fail();
      log.fatal(error);
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
