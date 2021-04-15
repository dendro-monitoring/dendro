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

export const buildApacheConfig = (): string => {
  let config = '';

  if (store.Vector.Apache.monitorMetrics) {
    config += metricConfig();
  }

  if (
    store.Vector.Apache.monitorAccessLogs ||
    store.Vector.Apache.monitorErrorLogs
  ) {
    config += logConfig();
  }

  return config;
};
