import { Command, flags } from '@oclif/command';
import chalk from 'chalk';
import store from '../store';
import log from '../utils/log';

export default class Review extends Command {
  static description = 'Pretty print the Vector config of monitored services';

  static flags = {
    help: flags.help({ char: 'h' }),
  };

  static args = [{ name: 'file' }];

  apacheData(): void {
    const {
      url,
      port,
      scrapeIntervalSeconds,
      monitorAccessLogs,
      monitorMetrics,
      monitorErrorLogs
    } = store.Vector.Apache;

    if (!monitorMetrics && !monitorErrorLogs && !monitorAccessLogs) return;

    const str = chalk.bold('Apache Data:\n') +
      `    URL: ${chalk.green(url)}\n` +
      `    Port: ${chalk.green(port)}\n` +
      `    Monitor Access Logs: ${chalk.green(monitorAccessLogs)}\n` +
      `    Monitor Error Logs: ${chalk.green(monitorErrorLogs)}\n` +
      `    Monitor Health Metrics: ${chalk.green(monitorMetrics)}\n` +
      `    Scrape Interval (in seconds): ${chalk.green(scrapeIntervalSeconds)}\n`;

    log.info(str);
  }

  mongoData(): void {
    const {
      url,
      port,
      scrapeIntervalSeconds,
      monitorMetrics,
      monitorLogs
    } = store.Vector.Mongo;

    if (!monitorMetrics && !monitorLogs) return;

    const str = chalk.bold('MongoDB Data:\n') +
      `    URL: ${chalk.green(url)}\n` +
      `    Port: ${chalk.green(port)}\n` +
      `    Monitor Logs: ${chalk.green(monitorLogs)}\n` +
      `    Monitor Health Metrics: ${chalk.green(monitorMetrics)}\n` +
      `    Scrape Interval (in seconds): ${chalk.green(scrapeIntervalSeconds)}\n`;

    log.info(str);
  }

  nginxData(): void {
    const {
      url,
      port,
      scrapeIntervalSeconds,
      monitorAccessLogs,
      monitorMetrics,
      monitorErrorLogs
    } = store.Vector.Nginx;

    if (!monitorMetrics && !monitorErrorLogs && !monitorAccessLogs) return;

    const str = chalk.bold('Nginx Data:\n') +
      `    URL: ${chalk.green(url)}\n` +
      `    Port: ${chalk.green(port)}\n` +
      `    Monitor Access Logs: ${chalk.green(monitorAccessLogs)}\n` +
      `    Monitor Error Logs: ${chalk.green(monitorErrorLogs)}\n` +
      `    Monitor Health Metrics: ${chalk.green(monitorMetrics)}\n` +
      `    Scrape Interval (in seconds): ${chalk.green(scrapeIntervalSeconds)}\n`;

    log.info(str);
  }

  postgresData(): void {
    const {
      url,
      port,
      scrapeIntervalSeconds,
      monitorMetrics,
      monitorErrorLogs
    } = store.Vector.Postgres;

    if (!monitorMetrics && !monitorErrorLogs) return;

    const str = chalk.bold('PostgreSQL Data:\n') +
      `    URL: ${chalk.green(url)}\n` +
      `    Port: ${chalk.green(port)}\n` +
      `    Monitor Error Logs: ${chalk.green(monitorErrorLogs)}\n` +
      `    Monitor Health Metrics: ${chalk.green(monitorMetrics)}\n` +
      `    Scrape Interval (in seconds): ${chalk.green(scrapeIntervalSeconds)}\n`;

    log.info(str);
  }

  hostData(): void {
    if (!store.Vector.Host.isMonitored()) return;

    const {
      cpu,
      disk,
      filesystem,
      load,
      host,
      memory,
      network,
      scrapeIntervalSeconds
    } = store.Vector.Host;

    const str = chalk.bold('Host Data:\n') +
      `    Montior CPU: ${chalk.green(cpu)}\n` +
      `    Montior Disk: ${chalk.green(disk)}\n` +
      `    Montior Filesystem: ${chalk.green(filesystem)}\n` +
      `    Monitor Load: ${chalk.green(load)}\n` +
      `    Monitor Host: ${chalk.green(host)}\n` +
      `    Monitor Memory: ${chalk.green(memory)}\n` +
      `    Monitor Network: ${chalk.green(network)}\n` +
      `    Scrape Interval (in seconds): ${chalk.green(scrapeIntervalSeconds)}\n`;

    log.info(str);
  }

  customApps(): void {
    if (store.Vector.CustomApplications.length === 0) return;

    const apps = store.Vector.CustomApplications;
    apps.forEach((app, idx) => {
      const { name, filepath } = app;

      const str = chalk.bold(`Custom Application ${idx + 1}:\n`) +
      `    Name: ${chalk.green(name)}\n` +
      `    Log Filepath: ${chalk.green(filepath)}\n`;

      log.info(str);
    });
  }

  async run() {
    this.parse(Review);

    this.apacheData();
    this.mongoData();
    this.nginxData();
    this.postgresData();
    this.hostData();
    this.customApps();
  }
}
