const AWS = require('aws-sdk')

function createTimestreamDatabase(DatabaseName, region = 'us-east-1') {
  return new Promise(resolve => {
    AWS.config.update({ region })

    const Timestream = new AWS.TimestreamWrite()

    const params = {
      DatabaseName,
    }

    Timestream.createDatabase(params, (err, data) => {
      if (err) throw new Error(err)
      else resolve(data)
    })
  })
}

module.exports = createTimestreamDatabase
