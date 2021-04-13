const AWS = require('aws-sdk')

AWS.config.update({region: 'us-east-1'});

const Timestream = new AWS.TimestreamWrite()

const params = {
  DatabaseName: process.argv[2]
}

Timestream.createDatabase(params, (err, data) => {
  console.log(err);
  console.log(data);
})