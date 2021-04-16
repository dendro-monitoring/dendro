const { MultiSelect, Form } = require('enquirer');
import { Command, flags } from '@oclif/command';
import log, { LevelNames } from '../utils/log';
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

  static nginxConfig: any = async () => {
    const nginxServices: string[] = await nginxPrompt.run();

    if (nginxServices.includes('Access log')) { store.Vector.Nginx.monitorAccessLogs = true; }
    if (nginxServices.includes('Error log')) { store.Vector.Nginx.monitorErrorLogs = true; }
    if (nginxServices.includes('Health metrics')) {
      const nginxHealth: any = await nginxHealthPrompt.run();

      store.Vector.Nginx.monitorMetrics = true;
      Object.assign(store.Vector.Nginx, nginxHealth);
    }
  };

  static apacheConfig: any = async () => {
    const apacheServices: string[] = await apachePrompt.run();

    if (apacheServices.includes('Access log')) { store.Vector.Apache.monitorAccessLogs = true; }
    if (apacheServices.includes('Error log')) { store.Vector.Apache.monitorErrorLogs = true; }
    if (apacheServices.includes('Health metrics')) {
      const apacheHealth: any = await apacheHealthPrompt.run();

      store.Vector.Apache.monitorMetrics = true;
      Object.assign(store.Vector.Apache, apacheHealth);
    }
  };

  static postgresConfig: any = async () => {
    const postgresServices: any = await postgresPrompt.run();

    if (postgresServices.includes('Error log')) { store.Vector.Postgres.monitorErrorLogs = true; }
    if (postgresServices.includes('Health metrics')) {
      const pgCreds: any = await postgresCredentialsPrompt.run();

      store.Vector.Postgres.monitorMetrics = true;
      Object.assign(store.Vector.Postgres, pgCreds);
    }
  };

  static mongoConfig: any = async () => {
    const mongoServices: any = await mongoPrompt.run();

    if (mongoServices.includes('Log')) { store.Vector.Mongo.monitorLogs = true; }
    if (mongoServices.includes('Health metrics')) { 
      const mongoCreds: any = await mongoCredentialsPrompt.run();

      store.Vector.Mongo.monitorMetrics = true;
      Object.assign(store.Vector.Mongo, mongoCreds);
    }
  };

  static hostConfig: any = async () => {
    const hostServices: any = await hostPrompt.run();

    const hostSelections = hostServices.reduce((map: any, obj: string) => {
      map[obj.toLowerCase()] = true;
      return map;
    }, {});

    console.log('Before:\n', store.Vector.Host);
    Object.assign(store.Vector.Host, hostSelections);
    console.log('After:\n', store.Vector.Host);
  };

  async run() {
    const { args, flags } = this.parse(Configure);
    const monitoringSelections = await servicesToMonitor.run();

    if (monitoringSelections.includes('nginx')) { await Configure.nginxConfig(); }
    if (monitoringSelections.includes('Apache')) { await Configure.apacheConfig(); }
    if (monitoringSelections.includes('Postgres')) { await Configure.postgresConfig(); }
    if (monitoringSelections.includes('MongoDB')) { await Configure.mongoConfig(); }
    if (monitoringSelections.includes('Host machine health')) { await Configure.hostConfig(); }
  }
}
