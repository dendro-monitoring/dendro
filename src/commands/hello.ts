import { Command, flags } from '@oclif/command'
import log, { LevelNames } from '../utils/log'

export default class Hello extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ dendro hello
hello world from ./src/hello.ts!
`,
  ]

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
      ],
      default: 'info',
    }),
  }

  static args = [
    // { name: 'file' }
  ]

  async run() {
    const { /* args, */ flags: cliFlags } = this.parse(Hello)

    const { level } = cliFlags
    this.log(`Log level is ${level}`)

    log.setLevel(level as LevelNames)
    log.debug('hi')
    log.info('hi')
    log.warn('hi')
    log.error('hi')

    const spinner = log.spin('Creating Lambda', { color: 'yellow' })

    setTimeout(() => {
      spinner.color = 'green'
      setTimeout(() => spinner.succeed(), 2000)
    }, 2000)
  }
}
