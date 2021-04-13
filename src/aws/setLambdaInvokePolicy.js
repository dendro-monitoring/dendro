const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-1'});

// Creates Lambda Function Policy which must be created once for each Lambda function
// Must be done before calling s3.putBucketNotificationConfiguration(...)
const lambda = new AWS.Lambda();

const ARN = process.argv[2] || "arn:aws:lambda:us-east-1:141351053848:function:createTimestreamDatabase"


const params = {
  Action:        'lambda:InvokeFunction',
  FunctionName:  ARN,
  Principal:     's3.amazonaws.com',
  StatementId:   `example-S3-permission`,
};

lambda.addPermission(params, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
