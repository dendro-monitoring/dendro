export interface LambdaData {
  FunctionArn?: string
}

/*
 * TODO: Document Class
 */
class Lambda {
  FunctionArn?: string;
  /*
   * TODO: Document descriptions & data types for properties
   */
  constructor({
    FunctionArn
  }: LambdaData) {
    this.FunctionArn = FunctionArn;
  }
}

export default Lambda;
