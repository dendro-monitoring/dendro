export interface TimestreamData {
  DatabaseName?: string
  NextToken?: string;
}

/*
 * TODO: Document Class
 */
class Timestream {
  DatabaseName?: string;
  NextToken?: string;

  constructor({ DatabaseName, NextToken }: TimestreamData) {
    this.DatabaseName = DatabaseName;
    this.NextToken = NextToken;
  }
}

export default Timestream;
