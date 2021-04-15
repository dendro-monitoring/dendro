const AWS = require('aws-sdk')

function setLambdaInvokePolicy(
  Arn,
  StatementId = 'example-S3-permission',
  region = 'us-east-1',
) {
  return new Promise(resolve => {
    AWS.config.update({ region })

    // Creates Lambda Function Policy which must be created once for each Lambda function
    // Must be done before calling s3.putBucketNotificationConfiguration(...)
    const lambda = new AWS.Lambda()

    const params = {
      Action: 'lambda:InvokeFunction',
      FunctionName: Arn,
      Principal: 's3.amazonaws.com',
      StatementId,
    }

    lambda.addPermission(params, (err, data) => {
      if (err) throw new Error(err)
      else resolve(data)
    })
  })
}

module.exports = setLambdaInvokePolicy
