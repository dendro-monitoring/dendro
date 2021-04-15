/* eslint-disable max-len */
/* eslint-disable no-console */

const path = require('path')
const { Command, flags } = require('@oclif/command')

const AWSWrapper = require('../aws')

const NEW_ROLE_NAME = 'dendroflumechuck-role'

const DELIVERY_STREAM_NAME = 'dendroflumechuck-stream'

const NEW_BUCKET_NAME = 'dendrodefaultbucket'

const DATABASE_NAME = 'dendroflumechuck-timestream'
const TABLE_NAME = 'default-table'

const PATH_TO_LAMBDA_FUNCTION = path.resolve(`${__dirname}/../aws/lambda/_deployableLambdaFunction.js`)

// TODO: Extract to global state, or like somewhere else
const LAMBDA_POLICY_ARN = 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'
const FIREHOSE_POLICY_ARN = 'arn:aws:iam::aws:policy/AmazonKinesisFirehoseFullAccess'
const TIMESTREAM_POLICY_ARN = 'arn:aws:iam::aws:policy/AmazonTimestreamFullAccess'
const S3_POLICY_ARN = 'arn:aws:iam::aws:policy/AmazonS3FullAccess'

class TestCommand extends Command {
  async run() {
    const parsed = this.parse(TestCommand)
    const name = parsed.flags.name || 'world'
    this.log(`test ${name} from ./src/commands/test.js`)

    try {
      console.log('Creating new role for dendroflumechuck pipeline...')
      const newRole = await AWSWrapper.createRole(NEW_ROLE_NAME, ['firehose.amazonaws.com', 'lambda.amazonaws.com'])

      console.log('\nAttaching AmazonKinesisFirehoseFullAccess policy...')
      await AWSWrapper.attachRolePolicy(NEW_ROLE_NAME, FIREHOSE_POLICY_ARN)

      console.log('\nAttaching AWSLambdaBasicExecutionRole policy...')
      await AWSWrapper.attachRolePolicy(NEW_ROLE_NAME, LAMBDA_POLICY_ARN)

      console.log('\nAttaching AmazonTimestreamFullAccess policy...')
      await AWSWrapper.attachRolePolicy(NEW_ROLE_NAME, TIMESTREAM_POLICY_ARN)

      console.log('\nAttaching AmazonS3FullAccess policy...')
      await AWSWrapper.attachRolePolicy(NEW_ROLE_NAME, S3_POLICY_ARN)

      console.log('\nCreating new bucket...')
      await AWSWrapper.createBucket(NEW_BUCKET_NAME)

      console.log('\nCreating firehose delivery stream...')
      await new Promise(r => setTimeout(r, 10000)) // TODO don't do this
      await AWSWrapper.createDeliveryStream(DELIVERY_STREAM_NAME, NEW_BUCKET_NAME, newRole.Role.Arn)

      console.log('\nCreating new timestream database...')
      await AWSWrapper.createTimestreamDatabase(DATABASE_NAME)

      console.log('\nCreating new timestream table...')
      await AWSWrapper.createTimestreamTable({ DatabaseName: DATABASE_NAME, TableName: TABLE_NAME })

      console.log('\nCreating new lambda...')
      const lambdaData = await AWSWrapper.createLambda({
        lambdaFile: PATH_TO_LAMBDA_FUNCTION,
        Role: newRole.Role.Arn,
        DATABASE_NAME,
        DATABASE_TABLE: TABLE_NAME,
      })

      console.log('Setting lambda invoke policy...')
      await AWSWrapper.setLambdaInvokePolicy(lambdaData.FunctionArn)

      console.log('Creating S3 trigger...')
      await AWSWrapper.createS3LambdaTrigger(NEW_BUCKET_NAME, lambdaData.FunctionArn)
    } catch (error) {
      console.log(error)
    }
  }
}

TestCommand.description = `Describe the command here
...
Extra documentation goes here
`

TestCommand.flags = {
  name: flags.string({ char: 'n', description: 'name to print' }),
}

module.exports = TestCommand
