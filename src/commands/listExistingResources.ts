import AWS = require('aws-sdk');
import { Command, flags } from '@oclif/command';

AWS.config.update({ region:'us-east-1' });
const firehose = new AWS.Firehose();
const lambda = new AWS.Lambda();
const s3 = new AWS.S3();
const iam = new AWS.IAM();

export default class listExistingResources extends Command {
  async run() {
    iam.listRoles({}, (err, data) => console.log(err, data));
    firehose.listDeliveryStreams({}, (err, data) => console.log(err, data));
    lambda.listFunctions({}, (err, data) => console.log(err, data));
    // s3.listBuckets({}, (err, data) => console.log(err, data));
  }
}
