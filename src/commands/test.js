/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const {Command, flags} = require('@oclif/command')

const AWSWrapper = require('../aws')

const NEW_ROLE_NAME = 'dendro-lambda-role'
const NEW_BUCKET_NAME = 'dendrodefaultbucket'
const PATH_TO_LAMBDA_FUNCTION = './aws/lambda/_deployableLambdaFunction.js'
const FILE_TO_UPLOAD = './aws/s3/uploadToBucket.js'

class TestCommand extends Command {
  async run() {
    const parsed = this.parse(TestCommand)
    const name = parsed.flags.name || 'world'
    this.log(`test ${name} from ./src/commands/test.js`)

    console.log('Creating new lambda role...')
    const [lambdaRoleErr, lambdaRole] = await AWSWrapper.createLambdaRole(NEW_ROLE_NAME)
    if (lambdaRoleErr) {
      console.error(lambdaRoleErr)
    } else {
      console.log('success')
    }
    console.log(lambdaRole.Role.Arn)

    console.log('Attaching AWSLambdaBasicExecutionRole...')
    const [attachPolicyErr, attachPolicyData] = await AWSWrapper.attachLambdaBasicExecutionPolicy(NEW_ROLE_NAME)
    if (attachPolicyErr) {
      console.error(attachPolicyErr)
    } else {
      console.log('success')
    }
    // console.log(attachPolicyData)

    console.log('Creating new lambda...')
    const [lambdaErr, lambdaData] = await AWSWrapper.createLambda(PATH_TO_LAMBDA_FUNCTION, 'arn:aws:iam::141351053848:role/dendro-lambda-role')
    if (lambdaErr) {
      console.error(lambdaErr)
    } else {
      console.log('success')
    }
    console.log(lambdaData)

    console.log('Creating new bucket...')

    const [bucketErr, bucketData] = await AWSWrapper.createBucket(NEW_BUCKET_NAME)
    if (bucketErr) {
      console.error(bucketErr)
    } else {
      console.log('success')
    }
    // console.log(bucketData)

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

    // // checks if AWS credentials are set
    // const [credentialsErr, credentials] = await AWSWrapper.getCredentials()
    // // console.log(credentialsErr)
    // console.log(credentials)

    // const [listLambdaErr, lamdas] = await AWSWrapper.listLambdas()
    // // console.log(listLambdaErr)
    // console.log(lamdas)
  }
}

TestCommand.description = `Describe the command here
...
Extra documentation goes here
`

TestCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = TestCommand
