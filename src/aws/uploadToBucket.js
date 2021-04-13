/* eslint-disable unicorn/filename-case */

const path = require('path')
const fs = require('fs')

const AWS = require('aws-sdk')

const s3 = new AWS.S3({apiVersion: '2006-03-01'})

function uploadToBucket(Bucket, file, callback, region = 'us-east-1') {
  AWS.config.update({region})

  const uploadParams = {Bucket, Key: '', Body: ''}

  if (!fs.existsSync(file)) throw new Error('Cannot open file')

  const fileStream = fs.createReadStream(file)

  fileStream.on('error', err => {
    throw new Error(err)
  })

  uploadParams.Body = fileStream
  uploadParams.Key = path.basename(file)

  s3.upload(uploadParams, callback)
}

module.exports = uploadToBucket
