const { Command, flags } = require('@oclif/command');

const orchestrator = require('../orchestrator');

const NEW_BUCKET_NAME = 'dendrodefaultbucket';

// TODO put & use constants in globalState. Right now, constants aren't being shared between services
//  so the connections are broken

class TestCommand extends Command {
  async run() {
    const parsed = this.parse(TestCommand);
    const name = parsed.flags.name || 'world';
    this.log(`test ${name} from ./src/commands/test.js`);

    try {
      const newRole = await orchestrator.createRole();

      await orchestrator.createBucket(NEW_BUCKET_NAME);
      await orchestrator.setupFirehose(newRole);
      await orchestrator.setupTimestream();

      const lambdaData = await orchestrator.setupLambda(newRole);
      await orchestrator.linkBucketToLambda(NEW_BUCKET_NAME, lambdaData);

    } catch (error) {
      console.error(error);
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
