class Lambda {
  constructor({
    Role,
    Policy,
    FunctionData,
  }) {
    this.Role = Role
    this.Policy = Policy
    this.FunctionData = FunctionData
  }
}

module.exports = Lambda
