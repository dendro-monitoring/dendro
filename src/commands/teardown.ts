/* eslint-disable max-lines-per-function */
import AWS = require('aws-sdk');
// import { AWSError, IAM } from 'aws-sdk';
import { Command, flags } from '@oclif/command';
import orchestrator from '../aws/orchestrator';
import log, { LevelNames } from "../utils/log";
import { AWS_REGION } from '../constants';

// const firehose = new AWS.Firehose();
// const lambda = new AWS.Lambda();
// const s3 = new AWS.S3();
// const iam = new AWS.IAM();

export default class Teardown extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
    level: flags.string({
      char: 'L',
      description: 'set the log level',
      options: [
        'debug',
        'info',
        'warn',
        'error',
        'fatal',
      ],
      default: 'info',
    }),
  };
  async run() {
    AWS.config.update({ region: AWS_REGION });
    const parsed = this.parse(Teardown);
    const { level } = parsed.flags;
    log.setLevel(level as LevelNames);
    let spinner;
    try {
      const itemsToDelete = await orchestrator.getItemsToDelete();
      console.log(itemsToDelete);
      spinner = log.spin('Deleting role...');
      const roleError = await orchestrator.deleteRole();
      if (roleError) {
        log.warn("Couldn't delete role: No such role exists");
      }
      spinner.succeed();

      spinner = log.spin('Deleting bucket...');
      const bucketError = await orchestrator.deleteBucket();
      if (bucketError) {
        log.warn("Couldn't delete bucket: No such bucket exists");
      }
      spinner.succeed();

      spinner = log.spin('Deleting firehose...');
      const firehoseError = await orchestrator.deleteFirehose();
      if (firehoseError) {
        log.warn("Couldn't delete firehose: No such stream name exists");
      }
      spinner.succeed();

      spinner = log.spin('Deleting lambda...');
      const lambdaError = await orchestrator.deleteLambda();
      if (lambdaError) {
        log.warn("Couldn't delete lambda: No such lambda exists");
      }
      spinner.succeed();

      await orchestrator.deleteTimestream();

    } catch (error) {
      spinner?.fail();
      console.log(error);
    }
  }
}
