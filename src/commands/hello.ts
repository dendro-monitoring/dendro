import { Command, flags } from '@oclif/command';
import log, { LevelNames } from '../utils/log';
import store from '../store';

export default class Hello extends Command {
  static description = 'describe the command here';

  static examples = [
    `$ dendro hello
hello world from ./src/hello.ts!
`,
  ];

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

  static args = [
    // { name: 'file' }
  ];

  async run() {
    console.log(store);
    const { /* args, */ flags: cliFlags } = this.parse(Hello);

    const { level } = cliFlags;
    log.info(
      `Log level is ${level}. Run this command with -L set to either:
      debug, info, warn, error or fatal\n`,
    );

    log.setLevel(level as LevelNames);
    log.debug('I am a debug statement. I only run when flag -L >= debug');
    log.info('I am a info statement. I only run when flag -L >= info');
    log.warn('I am a warn statement. I only run when flag -L >= warn');
    log.error('I am a error statement. I only run when flag -L >= error');

    const spinner = log.spin('Creating Lambda', { color: 'yellow' });

    setTimeout(() => {
      spinner.color = 'magenta';
      setTimeout(() => {
        spinner.succeed();
        log.fatal({
          msg: 'I am a fatal error. I crash the cli.',
          err: 'You suck',
        });
      }, 3000);
    }, 3000);
  }
}
