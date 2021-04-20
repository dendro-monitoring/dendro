import AWS = require('aws-sdk');
// import { AWSError, IAM } from 'aws-sdk';
import { Command } from '@oclif/command';
import store from '../store';
import detachRolePolicies from '../aws/orchestrator/detachRolePolicies';

// const firehose = new AWS.Firehose();
// const lambda = new AWS.Lambda();
// const s3 = new AWS.S3();
const iam = new AWS.IAM();

export default class Teardown extends Command {

  async run() {
    AWS.config.update({ region:'us-east-1' });
    await detachRolePolicies();

    // iam.deleteRole({ RoleName: store.AWS.IAM.Role.RoleName }, (err, data) => console.log(err, data));
    // firehose.listDeliveryStreams({}, (err: AWSError, data: any) => console.log(err, data));
    // lambda.listFunctions({}, (err: AWSError, data: any) => console.log(err, data));
    // s3.listBuckets({}, (err: AWSError, data: any) => console.log(err, data));
  }
}
