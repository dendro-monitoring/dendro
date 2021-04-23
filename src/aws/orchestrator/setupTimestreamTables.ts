import * as constants from "../../constants";
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
      DatabaseName: constants.AWS_TIMESTREAM_DATABASE_NAME,
      TableName
    } as unknown as any));
  }

  function setupApacheTables() {
    if (store.Vector.Apache.monitorAccessLogs || store.Vector.Apache.monitorErrorLogs) {
      pushCreateTablePromise(constants.VECTOR_APACHE_LOGS_TYPE);
    }
    if (store.Vector.Apache.monitorMetrics) {
      pushCreateTablePromise(constants.VECTOR_APACHE_METRICS_TYPE);
    }
  }

  function setupMongoTables() {
    if (store.Vector.Mongo.monitorLogs) {
      pushCreateTablePromise(constants.VECTOR_MONGO_LOGS_TYPE);
    }
    if (store.Vector.Mongo.monitorMetrics) {
      pushCreateTablePromise(constants.VECTOR_MONGO_METRICS_TYPE);
    }
  }

  function setupNginxTables() {
    if (store.Vector.Nginx.monitorAccessLogs || store.Vector.Nginx.monitorErrorLogs) {
      pushCreateTablePromise(constants.VECTOR_NGINX_LOGS_TYPE);
    }
    if (store.Vector.Nginx.monitorMetrics) {
      pushCreateTablePromise(constants.VECTOR_NGINX_METRICS_TYPE);
    }
  }

  function setupPostgresTables() {
    if (store.Vector.Postgres.monitorErrorLogs) {
      pushCreateTablePromise(constants.VECTOR_POSTGRES_LOGS_TYPE);
    }
    if (store.Vector.Postgres.monitorMetrics) {
      pushCreateTablePromise(constants.VECTOR_POSTGRES_METRICS_TYPE);
    }
  }

  return new Promise( resolve => {
    setupApacheTables();
    setupMongoTables();
    setupNginxTables();
    setupPostgresTables();
    if (store.Vector.Host.isMonitored()) {
      pushCreateTablePromise(constants.VECTOR_HOST_METRICS_TYPE);
    }
    if (store.Vector.CustomApplications.length > 0) {
      pushCreateTablePromise(constants.VECTOR_CUSTOM_APPLICATION_TYPE);
    }

    Promise.all(promises).then(() => {
      resolve();
    });
  });
}
