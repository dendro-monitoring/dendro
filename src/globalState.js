/*
 * Note: S3, Lambda, etc classes will be moved into their own file soon.
 */

// eslint-disable-next-line max-classes-per-file
class S3 {}

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

class Firehose {}

class Timestream {}

/*
 * GlobalState is an singleton that will contain all data over the lifetime
 * of the CLI command. Currently, it is initialized to no data, however after
 * we start making the CLI stateful, it should handle fetching the cache data
 * during initialization.
 */
class GlobalState {
  constructor() {
    this.Lambda = new Lambda()
    this.S3 = new S3()
    this.Firehose = new Firehose()
    this.Timestream = new Timestream()
  }
}

const globalState = new GlobalState()

module.exports = globalState
