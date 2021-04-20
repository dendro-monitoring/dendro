import createTable from '../timestream/createTimestreamTable';

import store from '../../store';

/**
 * Creates a table for each individual watched service listed under store.Vector
 * @returns Promise
 */
export default function createTimestreamTables(): Promise<void> {
  const promises: Array<Promise<any>> = [];

  function pushCreateTablePromise(serviceName: string) {
    promises.push(createTable({ 
      DatabaseName: store.AWS.Timestream.DatabaseName!, 
      TableName: `${store.AWS.Timestream.TablePrefix}-${serviceName}`
    } as unknown as any));
  }

  function setupApacheTables() {
    if (store.Vector.Apache.monitorAccessLogs) {
      pushCreateTablePromise('apache-access-logs');
    }
    if (store.Vector.Apache.monitorErrorLogs) { 
      pushCreateTablePromise('apache-error-logs');
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
    if (store.Vector.Nginx.monitorAccessLogs) {
      pushCreateTablePromise('nginx-access-logs');
    }
    if (store.Vector.Nginx.monitorErrorLogs) { 
      pushCreateTablePromise('nginx-error-logs');
    }
    if (store.Vector.Nginx.monitorMetrics) {
      pushCreateTablePromise('nginx-metrics');
    }
  }

  function setupPostgresTables() {
    if (store.Vector.Postgres.monitorErrorLogs) {
      pushCreateTablePromise('postgres-error-logs');
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
    if (store.Vector.Host.shouldBuildConfig()) {
      pushCreateTablePromise('host-metrics');
    }

    Promise.all(promises).then(() => {
      resolve();
    });
  });
} 
