import Credentials, { CredentialsData } from './credentials';
import Lambda, { LambdaData } from './lambda';
import S3, { S3Data } from './s3';
import Firehose, { FirehoseData } from './firehose';
import Timestream, { TimestreamData } from './timestream';
import IAM, { AWSIAMData } from './iam';

export interface AWSData {
  Credentials: CredentialsData;
  Lambda: LambdaData;
  S3: S3Data;
  Firehose: FirehoseData;
  Timestream: TimestreamData;
  IAM: AWSIAMData;
}

class AWS {
  Credentials: Credentials;

  Lambda: Lambda;

  S3: S3;

  Firehose: Firehose;

  Timestream: Timestream;

  IAM: IAM;

  constructor({
    Credentials: credentials = {},
    Lambda: lambda = {},
    S3: s3 = {},
    Firehose: firehose = {},
    Timestream: timestream = {},
    IAM: iam = { role: {}}
  }: AWSData) {
    this.Credentials = new Credentials(credentials);
    this.Lambda = new Lambda(lambda);
    this.S3 = new S3(s3);
    this.Firehose = new Firehose(firehose);
    this.Timestream = new Timestream(timestream);
    this.IAM = new IAM(iam);
  }
}

export default AWS;
