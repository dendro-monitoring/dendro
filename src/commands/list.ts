import AWS = require('aws-sdk');
import { Command, flags } from '@oclif/command';

AWS.config.update({ region: 'us-east-1' });

const firehose = new AWS.Firehose();
const lambda = new AWS.Lambda();
const s3 = new AWS.S3();
const iam = new AWS.IAM();
const timestream = new AWS.TimestreamWrite();

export default class List extends Command {
  async run() {
    firehose.listDeliveryStreams({}, (err, { DeliveryStreamNames }) => console.log(DeliveryStreamNames));
    lambda.listFunctions({}, (err, { Functions }) => console.log(Functions));
    s3.listBuckets({}, (err, { Buckets }) => console.log(Buckets));
    iam.listRoles({}, (err, { Roles }) => console.log(Roles));
    timestream.listDatabases({}, (err, { Databases }) => console.log(Databases));
  }
}