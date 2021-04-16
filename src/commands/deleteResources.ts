import AWS = require('aws-sdk');
import { AWSError } from 'aws-sdk';
import { Command, flags } from '@oclif/command';

const firehose = new AWS.Firehose();
const lambda = new AWS.Lambda();
const s3 = new AWS.S3();

export default class DeleteResources extends Command {
  
  
  async run() {
    AWS.config.update({ region:'us-east-1' });
    firehose.listDeliveryStreams({}, (err: AWSError, data: any) => console.log(err, data));
    lambda.listFunctions({}, (err: AWSError, data: any) => console.log(err, data));
    // s3.listBuckets({}, (err: AWSError, data: any) => console.log(err, data));
  }
}