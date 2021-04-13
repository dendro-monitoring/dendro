const AWSWrapper = require('./aws')

AWSWrapper.createBucket('angelbtestbuc', (err, data) => {
  console.log(err)
  console.log(data)
})

AWSWrapper.createLambda('./aws/_deployableLambdaFunction.js', 'arn:aws:iam::141351053848:role/lambda_role', (err, data) => {
  console.log(err)
  console.log(data)
})

AWSWrapper.setLambdaInvokePolicy('arn:aws:lambda:us-east-1:141351053848:function:getCredentials', (err, data) => {
  console.log(err)
  console.log(data)
})

AWSWrapper.createS3LambdaTrigger('angelbtestbuc', 'arn:aws:lambda:us-east-1:141351053848:function:getCredentials', (err, data) => {
  console.log(err)
  console.log(data)
})

AWSWrapper.uploadToBucket('angelbtestbuc', './aws/listLambdas.js', (err, data) => {
  console.log(err)
  console.log(data)
})

AWSWrapper.getCredentials((err, data) => {
  console.log(err)
  console.log(data)
})

module.exports = require('@oclif/command')

