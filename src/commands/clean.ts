import { Command, flags } from '@oclif/command';
import log, { LevelNames } from '../utils/log';
import store from '../store';

export default class Clean extends Command {
  static description = 'describe the command here';

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
    const { flags: cliFlags } = this.parse(Clean);

    const { level } = cliFlags;
    log.setLevel(level as LevelNames);

    const spinner = log.spin('Clearing cache');
    

    setTimeout(() => {
      store.clean();
      spinner.succeed('Cache cleared');
    }, 1500);
  }
}
