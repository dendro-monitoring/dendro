/* eslint-disable unicorn/filename-case */

const AWS = require('aws-sdk')

const s3 = new AWS.S3({apiVersion: '2006-03-01'})

function deleteBucket(Bucket, callback, region = 'us-east-1') {
  AWS.config.update({region})

  const bucketParams = {
    Bucket,
  }

  s3.deleteBucket(bucketParams, callback)
}

module.exports = deleteBucket
