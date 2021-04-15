import { Command, flags } from '@oclif/command';
import { MultiSelect }  from 'enquirer';
import log, { LevelNames } from '../utils/log';
import store from '../store';
import { 
  servicesToMonitor,
  nginxPrompt, nginxHealthPrompt,
  apachePrompt, apacheHealthPrompt,
} from '../prompts'

export default class Configure extends Command {
  static description = 'configuring collector/agent setup of log sources';
  static examples = [];
  static flags = {};

  async run() {
    const { args, flags } = this.parse(Configure)

    const monitoringSelections: string[] = await servicesToMonitor.run()

    if (monitoringSelections.includes('nginx')) {
      const nginxServices: string[] = await nginxPrompt.run();

      if (nginxServices.includes('Access log')) { store.Vector.Nginx.monitorAccessLogs = true; }
      if (nginxServices.includes('Error log')) { store.Vector.Nginx.monitorErrorLogs = true; }

      if (nginxServices.includes('Health metrics')) {
        const nginxHealth: any = await nginxHealthPrompt.run();

        store.Vector.Nginx.monitorMetrics = true;
        store.Vector.Nginx.url = nginxHealth.url;
        store.Vector.Nginx.port = nginxHealth.port;
        store.Vector.Nginx.scrapeInterval = nginxHealth.scrapeInterval;

        console.log(nginxHealth);
      }
    }

    if (monitoringSelections.includes('Apache')) {
      const apacheServices: string[] = await apachePrompt.run();

      if (apacheServices.includes('Access log')) { store.Vector.Apache.monitorAccessLogs = true; }
      if (apacheServices.includes('Error log')) { store.Vector.Apache.monitorErrorLogs = true; }

      if (apacheServices.includes('Health metrics')) {
        const apacheHealth: any = await apacheHealthPrompt.run();

        store.Vector.Apache.monitorMetrics = true;
        store.Vector.Apache.url = apacheHealth.url;
        store.Vector.Apache.port = apacheHealth.port;
        store.Vector.Apache.scrapeInterval = apacheHealth.scrapeInterval;

        console.log(apacheHealth);
      }
    }
    
    // 
    // store.Vector.Nginx.monitorMetrics = true

    // if Health Metrics is selected, go to form prompt and ask for:
    // scrape interval (default: 15s)
    // URL (default: localhost)
    // port (default: 80)
  }
}
