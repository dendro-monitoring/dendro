const AWS = require('aws-sdk');
const path = require('path');

function uploadToBucket(Bucket, file, callback, region = "us-east-1") {
  AWS.config.update({region});
  
  s3 = new AWS.S3({apiVersion: '2006-03-01'});
  
  var uploadParams = {Bucket, Key: '', Body: ''};
  
  var fs = require('fs');

  if (!fs.existsSync(file)) throw new Error('Cannot open file')

  var fileStream = fs.createReadStream(file);

  fileStream.on('error', function(err) {
    throw new Error(err)
  });

  uploadParams.Body = fileStream;
  uploadParams.Key = path.basename(file);
  
  s3.upload (uploadParams, callback);
}

module.exports = uploadToBucket