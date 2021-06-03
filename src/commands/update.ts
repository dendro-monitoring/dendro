import { Command } from '@oclif/command';
import log from '../utils/log';
import store from '../store';
import createTable from '../aws/timestream/createTimestreamTable';
import listTables from '../aws/orchestrator/timestream/listTables';
import * as constants from '../constants';

export async function updateTables(): Promise<void> {
  interface tables {
    [key: string]: boolean
  }
  const promises: Array<Promise<any>> = [];

  const listedTables: tables = {};

  function pushCreateTablePromise(TableName: string) {
    promises.push(createTable({
      DatabaseName: constants.AWS_TIMESTREAM_DATABASE_NAME,
      TableName
    } as unknown as any));
  }

  function createApacheTables() {
    if (store.Vector.Apache.monitorAccessLogs && !listedTables[constants.VECTOR_APACHE_ACCESS_LOGS_TYPE]) {
      pushCreateTablePromise(constants.VECTOR_APACHE_ACCESS_LOGS_TYPE);
    }
    if (store.Vector.Apache.monitorErrorLogs && !listedTables[constants.VECTOR_APACHE_ERROR_LOGS_TYPE]) {
      pushCreateTablePromise(constants.VECTOR_APACHE_ERROR_LOGS_TYPE);
    }
    if (store.Vector.Apache.monitorMetrics && !listedTables[constants.VECTOR_APACHE_METRICS_TYPE]) {
      pushCreateTablePromise(constants.VECTOR_APACHE_METRICS_TYPE);
    }
  }

  function createMongoTables() {
    if (store.Vector.Mongo.monitorLogs && !listedTables[constants.VECTOR_MONGO_LOGS_TYPE]) {
      pushCreateTablePromise(constants.VECTOR_MONGO_LOGS_TYPE);
    }
    if (store.Vector.Mongo.monitorMetrics && !listedTables[constants.VECTOR_MONGO_METRICS_TYPE]) {
      pushCreateTablePromise(constants.VECTOR_MONGO_METRICS_TYPE);
    }
  }

  function createNginxTables() {
    if (store.Vector.Nginx.monitorAccessLogs && !listedTables[constants.VECTOR_NGINX_ACCESS_LOGS_TYPE]) {
      pushCreateTablePromise(constants.VECTOR_NGINX_ACCESS_LOGS_TYPE);
    }
    if (store.Vector.Nginx.monitorErrorLogs && !listedTables[constants.VECTOR_NGINX_ERROR_LOGS_TYPE]) {
      pushCreateTablePromise(constants.VECTOR_NGINX_ERROR_LOGS_TYPE);
    }
    if (store.Vector.Nginx.monitorMetrics && !listedTables[constants.VECTOR_NGINX_METRICS_TYPE]) {
      pushCreateTablePromise(constants.VECTOR_NGINX_METRICS_TYPE);
    }
  }

  function createPostgresTables() {
    if (store.Vector.Postgres.monitorErrorLogs && !listedTables[constants.VECTOR_POSTGRES_LOGS_TYPE]) {
      pushCreateTablePromise(constants.VECTOR_POSTGRES_LOGS_TYPE);
    }
    if (store.Vector.Postgres.monitorMetrics && !listedTables[constants.VECTOR_POSTGRES_METRICS_TYPE]) {
      pushCreateTablePromise(constants.VECTOR_POSTGRES_METRICS_TYPE);
    }
  }

  const spinner = log.spin('Updating Timestream tables');

  (await listTables())?.forEach((table: any) => listedTables[table.TableName] = true);

  createApacheTables();
  createMongoTables();
  createNginxTables();
  createPostgresTables();

  if (store.Vector.Host.isMonitored() && !listedTables[constants.VECTOR_HOST_METRICS_TYPE]) {
    pushCreateTablePromise(constants.VECTOR_HOST_METRICS_TYPE);
  }
  if (store.Vector.CustomApplications.length > 0 && !listedTables[constants.VECTOR_CUSTOM_APPLICATION_TYPE]) {
    pushCreateTablePromise(constants.VECTOR_CUSTOM_APPLICATION_TYPE);
  }

  await Promise.all(promises);

  spinner.succeed();
}

export default class Update extends Command {
  static description = 'Creates any new Timestream tables as neccessary';

  async run(): Promise<void> {
    this.parse(Update);

    await updateTables();
  }
}
