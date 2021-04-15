import { Command, flags } from '@oclif/command'
import { MultiSelect }  from 'enquirer'

export default class Configure extends Command {
  static description = 'configuring collector/agent setup of log sources';

  static examples = [];

  static flags = {};

  async run() {
    const { args, flags } = this.parse(Configure)

    const prompt: any = new MultiSelect({
      name: 'sources',
      message: 'What would you like to monitor? Press Space to select and Enter to submit',
      choices: [
        { name: 'nginx' },
        { name: 'Apache' },
        { name: 'Postgres' },
        { name: 'MongoDB' },
        { name: 'Host machine health' },
        { name: 'Custom application (other)' },
      ],
    })

    prompt.run()
    .then(answer => console.log('Answer: ', answer))
    .catch(console.error)
  }
}
