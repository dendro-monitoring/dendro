import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';

import log, { LevelNames } from "../utils/log";
import AWSWrapper from '../aws';

export default class ListCommand extends Command {
  static description = 'describe the command here';

  static examples = [
    `$ dendro list
Roles
Buckets
Firehose streams
Lambda
Timestream
`,
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    // name: flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    // force: flags.boolean({ char: 'f' }),
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

  static args = [
    // { name: 'file' }
  ];

  static printRoles(roles: { RoleName: string}[]): void {
    if (roles.length == 0) { 
      log.info('No roles created!');
      return;
    }
    
    roles.forEach( async role => await cli.url(`- ${role.RoleName}`, `https://console.aws.amazon.com/iam/home?region=us-east-1#/roles/${role.RoleName}`)
    );
  }
  
  static printBuckets(buckets: { Name: string}[]): void {
    if (buckets.length == 0) { 
      log.info('No buckets created!');
      return;
    }
    
    buckets.forEach( async bucket => await cli.url(`- ${bucket.Name}`, `https://s3.console.aws.amazon.com/s3/buckets/${bucket.Name}?region=us-east-2&tab=objects`));
  }
  
  static printDeliveryStreams(streams: string[]): void {
    if (streams.length == 0) { 
      log.info('No streams created!');
      return;
    }

    streams.forEach( async stream =>  await cli.url(`- ${stream}`, `https://console.aws.amazon.com/firehose/home?region=us-east-1#/details/${stream}`)); 
  }
  
  async printLambdas(lambdas: { FunctionName: string }[]): Promise<void> {
    if (lambdas.length == 0) { 
      log.info('No lambdas created!');
      return;
    }
  
    lambdas.forEach( async lambda => await cli.url(`- ${lambda.FunctionName}`, `https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions/${lambda.FunctionName}?tab=code`));

  }
  
  static printTimestream(streams: { DatabaseName: string }[]): void {
    if (streams.length == 0) { 
      log.info('No streams created!');
      return;
    }
    
    streams.forEach( async stream => await cli.url(`- ${stream.DatabaseName}`, `https://console.aws.amazon.com/timestream/home?region=us-east-1#databases/${stream.DatabaseName}`)); 
  }

  async run() {
    const parsed = this.parse(ListCommand);
    const { level } = parsed.flags;
    log.setLevel(level as LevelNames);
    let spinner;

    spinner = log.spin('Listing roles...\n');
    const { Roles } = await AWSWrapper.listRoles();
    ListCommand.printRoles(Roles);
    spinner.succeed(' ');

    spinner = log.spin('Listing S3 buckets...\n');
    const { Buckets } = await AWSWrapper.listBuckets();
    ListCommand.printBuckets(Buckets);
    spinner.succeed(' ');

    spinner = log.spin('Listing Firehose delivery streams...\n');
    const { DeliveryStreamNames } = await AWSWrapper.listDeliveryStreams();
    ListCommand.printDeliveryStreams(DeliveryStreamNames);
    spinner.succeed(' ');

    spinner = log.spin('Listing Lambda functions...\n');
    const { Functions } = await AWSWrapper.listFunctions();
    await this.printLambdas(Functions);
    spinner.succeed();

    spinner = log.spin('Listing Timestream databases...\n');
    const { Databases } = await AWSWrapper.listDatabases();
    ListCommand.printTimestream(Databases);
    spinner.succeed();
  }
}
