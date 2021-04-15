import { Command, flags } from '@oclif/command';
import { MultiSelect }  from 'enquirer';
import log, { LevelNames } from '../utils/log';
import store from '../store';
import { servicesToMonitor, nginxPrompt } from '../prompts'

export default class Configure extends Command {
  static description = 'configuring collector/agent setup of log sources';
  static examples = [];
  static flags = {};

  async run() {
    const { args, flags } = this.parse(Configure)

    const monitoringSelections: string[] = await servicesToMonitor.run()

    if (monitoringSelections.includes('nginx')) {
      const nginxServices: string[] = await nginxPrompt.run()
      console.log(nginxServices)
    }
    
    // 
    // store.Vector.Nginx.monitorMetrics = true

    // if Health Metrics is selected, go to form prompt and ask for:
    // scrape interval (default: 15s)
    // URL (default: localhost)
    // port (default: 80)
  }
}
