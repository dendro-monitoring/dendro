export interface TimestreamData {
  DatabaseName?: string
  TablePrefix?: string
  NextToken?: string;
}

/*
 * TODO: Document Class
 */
class Timestream {
  DatabaseName?: string;
  TablePrefix?: string;
  NextToken?: string;
  
  constructor({ DatabaseName, TablePrefix, NextToken }: TimestreamData) {
    this.DatabaseName = DatabaseName;
    this.TablePrefix = TablePrefix;
    this.NextToken = NextToken;
  }
}

export default Timestream;
