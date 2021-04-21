import * as AWS from 'aws-sdk';
// import { AWSError, IAM } from 'aws-sdk';
import { Command, flags } from '@oclif/command';
import store from '../store';

import { AWS_IAM_ROLE_NAME, AWS_REGION } from '../constants';

// const firehose = new AWS.Firehose();
// const lambda = new AWS.Lambda();
// const s3 = new AWS.S3();
const iam = new AWS.IAM();

export default class DeleteResources extends Command {

  async run() {
    AWS.config.update({ region: AWS_REGION });
    iam.listAttachedRolePolicies({ RoleName: AWS_IAM_ROLE_NAME || '' }, (error, roleData) => console.log(error, roleData));
    // iam.deleteRole({ RoleName: store.AWS.IAM.Role.RoleName }, (err, data) => console.log(err, data));
    // firehose.listDeliveryStreams({}, (err: AWSError, data: any) => console.log(err, data));
    // lambda.listFunctions({}, (err: AWSError, data: any) => console.log(err, data));
    // s3.listBuckets({}, (err: AWSError, data: any) => console.log(err, data));
  }
}
