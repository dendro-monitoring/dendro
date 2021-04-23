import { Command, flags } from '@oclif/command';

import log, { LevelNames } from '../utils/log';
import orchestrator from '../aws/orchestrator';

export default class LogCommand extends Command {
  static description = 'logs cloudwatch logs';

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
    const { flags: cliFlags } = this.parse(LogCommand);

    const { level } = cliFlags;
    log.setLevel(level as LevelNames);

    const logs = await orchestrator.getLogs();

    console.log(JSON.stringify(logs, null, 2));

  }
}
