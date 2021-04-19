export interface TimestreamData {
  NextToken: string;
}

/*
 * TODO: Document Class
 */
class Timestream {
  /*
   * TODO: Document descriptions & data types for properties
   */
  NextToken: string;

  constructor({ NextToken }: TimestreamData) {
    this.NextToken = NextToken;
  }
}

export default Timestream;
