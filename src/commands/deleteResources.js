const AWS = require('aws-sdk');
AWS.config.update({ region:'us-east-1' });
const firehose = new AWS.Firehose();
const lambda = new AWS.Lambda();
const s3 = new AWS.S3();
const { Command, flags } = require('@oclif/command');

class deleteResources extends Command {


  async run() {
    firehose.listDeliveryStreams({}, (err, data) => console.log(err, data));
    lambda.listFunctions({}, (err, data) => console.log(err, data));
    s3.listBuckets({}, (err, data) => console.log(err, data));
  }


}

module.exports = deleteResources;