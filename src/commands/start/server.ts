import { Command, flags } from '@oclif/command';
const startServer = require("../../startServer");

export default class StartServer extends Command {
  static description = 'describe the command here';

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: 'f' }),
  };

  static args = [{ name: 'file' }];

  async run() {
    const { args, flags } = this.parse(StartServer);

    const name = flags.name ?? 'world';
    this.log(`hello ${name} from /home/andrew/workspace/js/dendro-cli/src/commands/start/server.ts`);
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`);
    }

    startServer();
  }
}
