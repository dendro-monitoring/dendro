export interface TimestreamData {
  DatabaseName?: string
  TableName?: string
  DatabaseData?: Record<string, any>
  NextToken?: string;
}

/*
 * TODO: Document Class
 */
class Timestream {
  DatabaseName?: string;
  TableName?: string;
  DatabaseData?: Record<string, any>;
  NextToken?: string;
  
  constructor({ DatabaseName, TableName, NextToken }: TimestreamData) {
    this.DatabaseName = DatabaseName;
    this.TableName = TableName;
    this.NextToken = NextToken;
  }
}

export default Timestream;
