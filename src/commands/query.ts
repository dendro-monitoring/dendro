import { Command, flags } from '@oclif/command';
import log, { LevelNames } from '../utils/log';

import orchestrator from '../aws/orchestrator';

export default class QueryCommand extends Command {
  static description = 'queries the database';

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

  static args = [
    { name: 'QueryString' },
  ];

  async run(): Promise<void> {
    const { flags: cliFlags, args: { QueryString } } = this.parse(QueryCommand);
    const { level } = cliFlags;
    log.setLevel(level as LevelNames);

    const results = await orchestrator.query(QueryString);
    console.log(results);
    
  }
}
