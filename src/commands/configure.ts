import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
import store, { storeDebugLogs } from '../store';
import log, { LevelNames } from '../utils/log';
const { Confirm, Form } = require('enquirer');

import {
  servicesToMonitor,
  nginxPrompt, nginxHealthPrompt,
  apachePrompt, apacheHealthPrompt,
  postgresPrompt, postgresCredentialsPrompt,
  mongoPrompt, mongoCredentialsPrompt,
  hostPrompt,
  customApplicationPromptOptions,
  promptCredentials
} from '../prompts';
import { PromptAnswers } from '../constants/cliTypes';
import { writeVectorConfig } from '../vector';
import chalk from 'chalk';

export default class Configure extends Command {
  static description = 'configuring collector/agent setup of log sources';
  static examples = [];

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

  async nginxConfig(): Promise<void> {
    console.clear();

    const nginxServices: PromptAnswers = (await nginxPrompt()).nginx;

    if (nginxServices?.includes('Access log')) { store.Vector.Nginx.monitorAccessLogs = true; }
    if (nginxServices?.includes('Error log')) { store.Vector.Nginx.monitorErrorLogs = true; }
    if (nginxServices?.includes('Health metrics')) {
      console.clear();
      const nginxHealth: any = await nginxHealthPrompt.run();
      nginxHealth.monitorMetrics = true;

      Object.assign(store.Vector.Nginx, nginxHealth);
    }
  }

  async apacheConfig(): Promise<void> {
    console.clear();

    const apacheServices: PromptAnswers = (await apachePrompt()).apache;

    if (apacheServices?.includes('Access log')) { store.Vector.Apache.monitorAccessLogs = true; }
    if (apacheServices?.includes('Error log')) { store.Vector.Apache.monitorErrorLogs = true; }
    if (apacheServices?.includes('Health metrics')) {
      console.clear();
      const apacheHealth: any = await apacheHealthPrompt.run();
      apacheHealth.monitorMetrics = true;

      Object.assign(store.Vector.Apache, apacheHealth);
    }
  }

  async postgresConfig(): Promise<void> {
    console.clear();

    const postgresServices: PromptAnswers = (await postgresPrompt()).postgres;

    if (postgresServices?.includes('Error log')) { store.Vector.Postgres.monitorErrorLogs = true; }
    if (postgresServices?.includes('Health metrics')) {
      console.clear();
      const pgCreds: any = await postgresCredentialsPrompt.run();
      pgCreds.monitorMetrics = true;

      Object.assign(store.Vector.Postgres, pgCreds);
    }
  }

  async mongoConfig(): Promise<void> {
    console.clear();

    const mongoServices: PromptAnswers = (await mongoPrompt()).mongo;

    if (mongoServices?.includes('Log')) { store.Vector.Mongo.monitorLogs = true; }
    if (mongoServices?.includes('Health metrics')) {
      console.clear();

      const mongoCreds: any = await mongoCredentialsPrompt.run();
      mongoCreds.monitorMetrics = true;

      Object.assign(store.Vector.Mongo, mongoCreds);
    }
  }

  async hostConfig(): Promise<void> {
    console.clear();

    const hostServices: PromptAnswers = (await hostPrompt()).host;

    if (!hostServices) return;

    const hostSelections = hostServices.reduce((map: any, obj: string) => {
      map[obj.toLowerCase()] = true;
      return map;
    }, {});

    Object.assign(store.Vector.Host, hostSelections);
  }

  async customApplicationConfig(): Promise<void> {
    console.clear();

    let addAnother = true;
    while (addAnother) {
      const customApp = await new Form(customApplicationPromptOptions).run();
      customApp.name = customApp.name.replace(' ', '_');

      store.Vector.setCustomApp(customApp);

      const confirm = new Confirm({
        name: 'question',
        message: 'Want to add another custom application log?',
      });

      addAnother = await confirm.run();
    }
  }

  async run(): Promise<void> {
    const { flags: cliFlags } = this.parse(Configure);
    const { level } = cliFlags;

    log.setLevel(level as LevelNames);
    storeDebugLogs();

    console.clear();

    store.clean();

    const monitoringSelections: string[] = (await servicesToMonitor()).sources;

    if (monitoringSelections.includes('nginx')) { await this.nginxConfig(); }
    if (monitoringSelections.includes('Apache')) { await this.apacheConfig(); }
    if (monitoringSelections.includes('Postgres')) { await this.postgresConfig(); }
    if (monitoringSelections.includes('MongoDB')) { await this.mongoConfig(); }
    if (monitoringSelections.includes('Host machine health')) { await this.hostConfig(); }
    if (monitoringSelections.includes('Custom application (other)')) { await this.customApplicationConfig(); }

    await promptCredentials();

    console.clear();
    log.info('Saving selections to cache');
    log.info(`To review your selections, please run ${chalk.bold.yellow('dendro review')}`);
    log.info(`To clear your current configuration, please run ${chalk.bold.yellow('dendro clean')}`);

    if (store.Vector.Apache.monitorAccessLogs || store.Vector.Apache.monitorErrorLogs) {
      log.info('For more information on how Apache logs are formatted by default, please check:');
      cli.url('Apache\'s Error Log Format', 'https://httpd.apache.org/docs/2.4/mod/core.html#errorlogformat');
    }

    if (store.Vector.Nginx.monitorAccessLogs || store.Vector.Nginx.monitorErrorLogs) {
      log.info('For more information on how NginX logs are formatted by default, please check:');
      cli.url('NginX\'s ngx_http_log_module', 'http://nginx.org/en/docs/http/ngx_http_log_module.html');
    }

    store.dump();

    await writeVectorConfig();
  }
}
