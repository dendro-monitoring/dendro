import { AWS_TIMESTREAM_DATABASE_NAME } from "../../constants";
import createTable from '../timestream/createTimestreamTable';

import store from '../../store';

/**
 * Creates a table for each individual watched service listed under store.Vector
 * @returns Promise
 */
export default function createTimestreamTables(): Promise<void> {
  const promises: Array<Promise<any>> = [];

  function pushCreateTablePromise(TableName: string) {
    promises.push(createTable({
      DatabaseName: AWS_TIMESTREAM_DATABASE_NAME,
      TableName
    } as unknown as any));
  }

  function setupApacheTables() {
    if (store.Vector.Apache.monitorAccessLogs || store.Vector.Apache.monitorErrorLogs) {
      pushCreateTablePromise('apache-logs');
    }
    if (store.Vector.Apache.monitorMetrics) {
      pushCreateTablePromise('apache-metrics');
    }
  }

  function setupMongoTables() {
    if (store.Vector.Mongo.monitorLogs) {
      pushCreateTablePromise('mongo-logs');
    }
    if (store.Vector.Mongo.monitorMetrics) {
      pushCreateTablePromise('mongo-metrics');
    }
  }

  function setupNginxTables() {
    if (store.Vector.Nginx.monitorAccessLogs || store.Vector.Nginx.monitorErrorLogs) {
      pushCreateTablePromise('nginx-logs');
    }
    if (store.Vector.Nginx.monitorMetrics) {
      pushCreateTablePromise('nginx-metrics');
    }
  }

  function setupPostgresTables() {
    if (store.Vector.Postgres.monitorErrorLogs) {
      pushCreateTablePromise('postgres-logs');
    }
    if (store.Vector.Postgres.monitorMetrics) {
      pushCreateTablePromise('postgres-metrics');
    }
  }

  return new Promise( resolve => {
    setupApacheTables();
    setupMongoTables();
    setupNginxTables();
    setupPostgresTables();
    if (store.Vector.Host.isMonitored()) {
      pushCreateTablePromise('host-metrics');
    }
    if (store.Vector.CustomApplications.length > 0) {
      pushCreateTablePromise('custom-application');
    }

    Promise.all(promises).then(() => {
      resolve();
    });
  });
}
