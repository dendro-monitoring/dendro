import { Command, flags } from '@oclif/command';
const startServer = require("../../startServer");

export default class StartServer extends Command {
  static description = 'describe the command here';

  static flags = {
    help: flags.help({ char: 'h' })
  };

  static args = [];

  async run() {
    const { args, flags } = this.parse(StartServer);

    process.env.NODE_ENV = 'production';

    startServer();
  }
}
