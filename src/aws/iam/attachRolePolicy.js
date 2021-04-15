const AWS = require('aws-sdk')

const iam = new AWS.IAM()

function attachRolePolicy(RoleName, PolicyArn) {
  return new Promise(resolve => {
    const params = {
      PolicyArn,
      RoleName,
    }

    iam.attachRolePolicy(params, (err, data) => {
      resolve([err, data])
    })
  })
}

module.exports = attachRolePolicy
