export interface LambdaData {}

/*
 * TODO: Document Class
 */
class Lambda {
  /*
   * TODO: Document descriptions & data types for properties
   */
  constructor({
    Role,
    Policy,
    FunctionData,
  }: LambdaData) {
    this.Role = Role;
    this.Policy = Policy;
    this.FunctionData = FunctionData;
  }
}

export default Lambda;
