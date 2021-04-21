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
      spinner = log.spin('Deleting role...');
      await orchestrator.deleteRole();
      spinner.succeed();

      spinner = log.spin('Deleting bucket...');
      await orchestrator.deleteBucket();
      spinner.succeed();

    } catch (error) {
      spinner?.fail();
      console.log(error);
    }
  }
}
