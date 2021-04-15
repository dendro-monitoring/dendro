/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const path = require('path')
const { Command, flags } = require('@oclif/command')

const AWSWrapper = require('../aws')

const NEW_ROLE_NAME = 'dendroflumechuck-role'

const DELIVERY_STREAM_NAME = 'newStreamTest'

const NEW_BUCKET_NAME = 'dendrodefaultbucket'

const DATABASE_NAME = 'dendroflumechuck-timestream'
const TABLE_NAME = 'default-table'

const PATH_TO_LAMBDA_FUNCTION = path.resolve(`${__dirname}/../aws/lambda/_deployableLambdaFunction.js`)
const FILE_TO_UPLOAD = path.resolve(`${__dirname}/../aws/s3/uploadToBucket.js`)

// TODO: Extract to global state, or like somewhere else
const LAMBDA_POLICY_ARN = 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'
const FIREHOSE_POLICY_ARN = 'arn:aws:iam::aws:policy/AmazonKinesisFirehoseFullAccess'
const TIMESTREAM_POLICY_ARN = 'arn:aws:iam::aws:policy/AmazonTimestreamFullAccess'

class TestCommand extends Command {
  async run() {
    const parsed = this.parse(TestCommand)
    const name = parsed.flags.name || 'world'
    this.log(`test ${name} from ./src/commands/test.js`)

    console.log('Creating new role for dendroflumechuck pipeline...')
    const [firehoseRoleErr, firehoseRole] = await AWSWrapper.createRole(NEW_ROLE_NAME, ['firehose.amazonaws.com', 'lambda.amazonaws.com'])
    if (firehoseRoleErr) {
      console.error(firehoseRoleErr)
    } else {
      console.log('success')
    }
    // console.log(firehoseRole)

    console.log('Attaching AmazonKinesisFirehoseFullAccess policy...')
    const [firehosePolicyErr, firehosePolicyData] = await AWSWrapper.attachRolePolicy(NEW_ROLE_NAME, FIREHOSE_POLICY_ARN)
    if (firehosePolicyErr) {
      console.error(firehosePolicyErr)
    } else {
      console.log('success')
    }
    // console.log(firehosePolicyData)

    console.log('Attaching AWSLambdaBasicExecutionRole policy...')
    const [lambdaPolicyErr, lambdaPolicyData] = await AWSWrapper.attachRolePolicy(NEW_ROLE_NAME, LAMBDA_POLICY_ARN)
    if (lambdaPolicyErr) {
      console.error(lambdaPolicyErr)
    } else {
      console.log('success')
    }
    // console.log(lambdaPolicyData)

    console.log('Attaching AmazonTimestreamFullAccess policy...')
    const [timestreamPolicyErr, timestreamPolicyData] = await AWSWrapper.attachRolePolicy(NEW_ROLE_NAME, TIMESTREAM_POLICY_ARN)
    if (timestreamPolicyErr) {
      console.error(timestreamPolicyErr)
    } else {
      console.log('success')
    }
    // console.log(timestreamPolicyData)

    console.log('Creating new bucket...')

    const [bucketErr, bucketData] = await AWSWrapper.createBucket(NEW_BUCKET_NAME)
    if (bucketErr) {
      console.error(bucketErr)
    } else {
      console.log('success')
    }
    // console.log(bucketData)

    console.log('Creating firehose delivery stream...')

    await new Promise(r => setTimeout(r, 10000)) // TODO don't do this

    const deliveryStreamData = await AWSWrapper.createDeliveryStream(DELIVERY_STREAM_NAME, NEW_BUCKET_NAME, firehoseRole.Role.Arn)
    console.log('success')
    // console.log(deliveryStreamData)

    console.log('Creating new timestream database...')

    const timestreamData = await AWSWrapper.createTimestreamDatabase(DATABASE_NAME)
    console.log('success')
    // console.log(timestreamData)

    console.log('Creating new timestream table...')

    const timestreamTableData = await AWSWrapper.createTimestreamTable({ DatabaseName: DATABASE_NAME, TableName: TABLE_NAME })
    console.log('success')
    // console.log(timestreamTableData)

    console.log('Creating new lambda...')
    const [lambdaErr, lambdaData] = await AWSWrapper.createLambda({
      lambdaFile: PATH_TO_LAMBDA_FUNCTION,
      Role: firehoseRole.Role.Arn,
      DATABASE_NAME,
      DATABASE_TABLE: TABLE_NAME,
    })
    if (lambdaErr) {
      console.error(lambdaErr)
    } else {
      console.log('success')
    }
    // console.log(lambdaData)

    console.log('Setting lambda invoke policy...')
    const [policyErr, policyData] = await AWSWrapper.setLambdaInvokePolicy(lambdaData.FunctionArn)
    if (policyErr) {
      console.error(policyErr)
    } else {
      console.log('success')
    }
    // console.log(policyData)

    console.log('Creating S3 trigger...')
    const [triggerErr, triggerData] = await AWSWrapper.createS3LambdaTrigger(NEW_BUCKET_NAME, lambdaData.FunctionArn)
    if (triggerErr) {
      console.error(triggerErr)
    } else {
      console.log('success')
    }
    // console.log(triggerData)

    console.log('Uploading to S3...')
    const [uploadErr, uploadData] = await AWSWrapper.uploadToBucket(NEW_BUCKET_NAME, FILE_TO_UPLOAD)
    if (uploadErr) {
      console.error(uploadErr)
    } else {
      console.log('success')
    }
    // console.log(uploadData)

    // // // checks if AWS credentials are set
    // // const [credentialsErr, credentials] = await AWSWrapper.getCredentials()
    // // // console.log(credentialsErr)
    // // console.log(credentials)

    // // const [listLambdaErr, lamdas] = await AWSWrapper.listLambdas()
    // // // console.log(listLambdaErr)
    // // console.log(lamdas)
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
