const path = require('path')
const fs = require('fs')

const AWS = require('aws-sdk')

const s3 = new AWS.S3({ apiVersion: '2006-03-01' })

function uploadToBucket(Bucket, file, region = 'us-east-1') {
  return new Promise(resolve => {
    AWS.config.update({ region })

    const uploadParams = { Bucket, Key: '', Body: '' }

    if (!fs.existsSync(file)) throw new Error('Cannot open file')

    const fileStream = fs.createReadStream(file)

    fileStream.on('error', err => {
      throw new Error(err)
    })

    uploadParams.Body = fileStream
    uploadParams.Key = path.basename(file)

    s3.upload(uploadParams, (err, data) => {
      if (err) throw new Error(err)
      else resolve(data)
    })
  })
}

module.exports = uploadToBucket
