// import log, { LevelNames } from '../utils/log';
const { MultiSelect, Form } = require('enquirer');
// import { Command, flags } from '@oclif/command';
import { Command } from '@oclif/command';
import store from '../store';

import { 
  servicesToMonitor,
  nginxPrompt, nginxHealthPrompt,
  apachePrompt, apacheHealthPrompt,
  postgresPrompt, postgresCredentialsPrompt,
  mongoPrompt, mongoCredentialsPrompt,
  hostPrompt
} from '../prompts';

export default class Configure extends Command {
  static description = 'configuring collector/agent setup of log sources';
  static examples = [];
  static flags = {};

  async nginxConfig(): Promise<void> {
    console.clear();

    const nginxServices: string[] = await nginxPrompt.run();

    if (nginxServices.includes('Access log')) { store.Vector.Nginx.monitorAccessLogs = true; }
    if (nginxServices.includes('Error log')) { store.Vector.Nginx.monitorErrorLogs = true; }
    if (nginxServices.includes('Health metrics')) {
      console.clear();
      const nginxHealth: any = await nginxHealthPrompt.run();
      nginxHealth.scrapeIntervalSeconds = parseInt(nginxHealth.scrapeIntervalSeconds, 10);

      store.Vector.Nginx.monitorMetrics = true;
      Object.assign(store.Vector.Nginx, nginxHealth);
    }
  }

  async apacheConfig(): Promise<void> {
    console.clear();

    const apacheServices: string[] = await apachePrompt.run();

    if (apacheServices.includes('Access log')) { store.Vector.Apache.monitorAccessLogs = true; }
    if (apacheServices.includes('Error log')) { store.Vector.Apache.monitorErrorLogs = true; }
    if (apacheServices.includes('Health metrics')) {
      console.clear();
      const apacheHealth: any = await apacheHealthPrompt.run();
      apacheHealth.scrapeIntervalSeconds = parseInt(apacheHealth.scrapeIntervalSeconds, 10);

      store.Vector.Apache.monitorMetrics = true;
      Object.assign(store.Vector.Apache, apacheHealth);
    }
  }

  async postgresConfig(): Promise<void> {
    console.clear();

    const postgresServices: string[] = await postgresPrompt.run();

    if (postgresServices.includes('Error log')) { store.Vector.Postgres.monitorErrorLogs = true; }
    if (postgresServices.includes('Health metrics')) {
      console.clear();
      const pgCreds: any = await postgresCredentialsPrompt.run();
      pgCreds.scrapeIntervalSeconds = parseInt(pgCreds.scrapeIntervalSeconds, 10);

      store.Vector.Postgres.monitorMetrics = true;
      Object.assign(store.Vector.Postgres, pgCreds);
    }
  }

  async mongoConfig(): Promise<void> {
    console.clear();
    
    const mongoServices: string[] = await mongoPrompt.run();

    if (mongoServices.includes('Log')) { store.Vector.Mongo.monitorLogs = true; }
    if (mongoServices.includes('Health metrics')) { 
      console.clear();
      const mongoCreds: any = await mongoCredentialsPrompt.run();
      mongoCreds.scrapeIntervalSeconds = parseInt(mongoCreds.scrapeIntervalSeconds, 10);

      store.Vector.Mongo.monitorMetrics = true;
      Object.assign(store.Vector.Mongo, mongoCreds);
    }
  }

  async hostConfig(): Promise<void> {
    console.clear();

    const hostServices: string[] = await hostPrompt.run();
    const hostSelections = hostServices.reduce((map: any, obj: string) => {
      map[obj.toLowerCase()] = true;
      return map;
    }, {});

    Object.assign(store.Vector.Host, hostSelections);
  }

  async run(): Promise<void> {
    // const { args, flags } = this.parse(Configure);
    const monitoringSelections = await servicesToMonitor.run();

    if (monitoringSelections.includes('nginx')) { await this.nginxConfig(); }
    if (monitoringSelections.includes('Apache')) { await this.apacheConfig(); }
    if (monitoringSelections.includes('Postgres')) { await this.postgresConfig(); }
    if (monitoringSelections.includes('MongoDB')) { await this.mongoConfig(); }
    if (monitoringSelections.includes('Host machine health')) { await this.hostConfig(); }

    console.log(store);
    // store.dump();
  }
}
