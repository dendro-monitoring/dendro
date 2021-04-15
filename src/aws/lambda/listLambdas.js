const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

const lambda = new AWS.Lambda();

function listLambdas() {
  return new Promise(resolve => {
    lambda.listFunctions((err, data) => {
      if (err) throw new Error(err);
      else resolve(data);
    });
  });
}

module.exports = listLambdas;

