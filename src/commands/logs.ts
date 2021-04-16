import { Command, flags } from '@oclif/command';

import log, { LevelNames } from '../utils/log';
import AWSWrapper from '../aws';

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

    // const streams = await AWSWrapper.describeLogStreams('/aws/lambda/_deployableLambdaFunction');
    const logs = await AWSWrapper.getLogEvents('/aws/lambda/_deployableLambdaFunction', '2021/04/15/[$LATEST]a197409bd49f4acf883d9e13444d3127');
    console.log('====================================');
    console.log(logs);
    console.log('====================================');
  }
}
