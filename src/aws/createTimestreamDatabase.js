/* eslint-disable unicorn/filename-case */

const AWS = require('aws-sdk')

function createTimestreamDatabase(DatabaseName, callback, region = 'us-east-1') {
  AWS.config.update({region})

  const Timestream = new AWS.TimestreamWrite()

  const params = {
    DatabaseName,
  }

  Timestream.createDatabase(params, callback)
}

module.exports = createTimestreamDatabase
