import { Command, flags } from '@oclif/command';
import log, { LevelNames } from '../utils/log';
// import store from '../store';

import AWSWrapper from '../aws';

export default class QueryCommand extends Command {
  static description = 'removes the existing cache from disk';

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

  async run() {
    const { flags: cliFlags, args: { QueryString } } = this.parse(QueryCommand);
    const { level } = cliFlags;
    log.setLevel(level as LevelNames);
    
    const result = await AWSWrapper.query(QueryString);
    result.Rows.forEach( data => console.log(data));
    
  }
}
