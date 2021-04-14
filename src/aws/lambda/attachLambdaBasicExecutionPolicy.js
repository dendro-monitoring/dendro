const AWS = require('aws-sdk')

const iam = new AWS.IAM()

function attachLambdaBasicExecutionPolicy(RoleName) {
  return new Promise(resolve => {
    const params = {
      PolicyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
      RoleName,
    }

    iam.attachRolePolicy(params, (err, data) => {
      resolve([err, data])
    })
  })
}

module.exports = attachLambdaBasicExecutionPolicy
