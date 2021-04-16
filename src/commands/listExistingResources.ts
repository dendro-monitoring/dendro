import AWS = require('aws-sdk');
import { Command, flags } from '@oclif/command';

const firehose = new AWS.Firehose();
const lambda = new AWS.Lambda();
const s3 = new AWS.S3();

export default class listExistingResources extends Command {
  async run() {
    AWS.config.update({ region:'us-east-1' });
    firehose.listDeliveryStreams({}, (err, data) => console.log(err, data));
    lambda.listFunctions({}, (err, data) => console.log(err, data));
    // s3.listBuckets({}, (err, data) => console.log(err, data));
  }
}
