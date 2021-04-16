export interface TimestreamData {
  DatabaseName?: string
  TableName?: string
  DatabaseData?: Record<string, any>
}

/*
 * TODO: Document Class
 */
class Timestream {
  DatabaseName?: string;
  TableName?: string;
  DatabaseData?: Record<string, any>;
  /*
   * TODO: Document descriptions & data types for properties
   */
  constructor({ DatabaseName, TableName }: TimestreamData) {
    this.DatabaseName = DatabaseName;
    this.TableName = TableName;
  }
}

export default Timestream;
