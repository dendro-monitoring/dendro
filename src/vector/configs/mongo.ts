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

export const buildMongoConfig = (): string => {
  let config = ''

  if (globalState.Vector.Mongo.monitorMetrics) {
    config += metricConfig()
  }

  if (globalState.Vector.Mongo.monitorLogs) {
    config += logConfig()
  }

  return config
}
