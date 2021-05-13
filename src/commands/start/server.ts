import { Command, flags } from '@oclif/command';
const startServer = require('../../startServer');

export default class StartServer extends Command {
  static description = 'Start dendro\'s dashboard for viewing live metrics';

  static flags = {
    help: flags.help({ char: 'h' })
  };

  static args = [];

  async run() {
    this.parse(StartServer);

    process.env.NODE_ENV = 'production';

    startServer();
  }
}
