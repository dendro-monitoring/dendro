import Credentials, { CredentialsData } from './credentials';
import Lambda, { LambdaData } from './lambda';
import S3, { S3Data } from './s3';
import Firehose, { FirehoseData } from './firehose';
import Timestream, { TimestreamData } from './timestream';

export interface AWSData {
  credentials: CredentialsData;
  lambda: LambdaData;
  s3: S3Data;
  firehose: FirehoseData;
  timestream: TimestreamData;
}

class AWS {
  Credentials: Credentials;

  Lambda: Lambda;

  S3: S3;

  Firehose: Firehose;

  Timestream: Timestream;

  constructor({
    credentials = {},
    lambda = {},
    s3 = {},
    firehose = {},
    timestream = {},
  }: AWSData) {
    this.Credentials = new Credentials(credentials);
    this.Lambda = new Lambda(lambda);
    this.S3 = new S3(s3);
    this.Firehose = new Firehose(firehose);
    this.Timestream = new Timestream(timestream);
  }
}

export default AWS;
