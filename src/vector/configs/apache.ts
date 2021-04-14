import globalState from '../../globalState'

// TODO
const logConfig = (): string => {
  console.log('Not Implemented')
  return ''
}

// TODO
const metricConfig = (): string => {
  console.log('Not Implemented')
  return ''
}

export const buildApacheConfig = (): string => {
  let config = ''

  if (globalState.Vector.Apache.monitorMetrics) {
    config += metricConfig()
  }

  if (
    globalState.Vector.Apache.monitorAccessLogs ||
    globalState.Vector.Apache.monitorErrorLogs
  ) {
    config += logConfig()
  }

  return config
}
