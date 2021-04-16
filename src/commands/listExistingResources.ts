import AWS = require('aws-sdk');
import { Command, flags } from '@oclif/command';

<<<<<<< HEAD
AWS.config.update({ region:'us-east-1' });
const firehose = new AWS.Firehose();
const lambda = new AWS.Lambda();
const s3 = new AWS.S3();
const iam = new AWS.IAM();

export default class listExistingResources extends Command {
  async run() {
    iam.listRoles({}, (err, data) => console.log(err, data));
=======
const firehose = new AWS.Firehose();
const lambda = new AWS.Lambda();
const s3 = new AWS.S3();

export default class listExistingResources extends Command {
  async run() {
    AWS.config.update({ region:'us-east-1' });
>>>>>>> 0becc9cc1b4db997d07357e1fb3c471766f7922a
    firehose.listDeliveryStreams({}, (err, data) => console.log(err, data));
    lambda.listFunctions({}, (err, data) => console.log(err, data));
    // s3.listBuckets({}, (err, data) => console.log(err, data));
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 0becc9cc1b4db997d07357e1fb3c471766f7922a
