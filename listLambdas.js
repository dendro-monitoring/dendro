const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-1'});

const lambda = new AWS.Lambda();

lambda.listFunctions((err, data) => {
  console.log(data.Functions);
})