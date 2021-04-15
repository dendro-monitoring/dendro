import store from '../../store';

// TODO
const logConfig = (): string => {
  console.log('Not Implemented');
  return '';
};

// TODO
const metricConfig = (): string => {
  console.log('Not Implemented');
  return '';
};

export const buildMongoConfig = (): string => {
  let config = '';

  if (store.Vector.Mongo.monitorMetrics) {
    config += metricConfig();
  }

  if (store.Vector.Mongo.monitorLogs) {
    config += logConfig();
  }

  return config;
};
