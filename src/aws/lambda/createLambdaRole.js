const AWS = require('aws-sdk')

const iam = new AWS.IAM()

function createLambdaRole(RoleName) {
  return new Promise(resolve => {
    const params = {
      AssumeRolePolicyDocument: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              Service: [
                'lambda.amazonaws.com',
              ],
            },
            Action: [
              'sts:AssumeRole',
            ],
          },
        ],
      }),
      Path: '/',
      RoleName,
    }

    iam.createRole(params, (err, data) => {
      resolve([err, data])
    })
  })
}

module.exports = createLambdaRole
