const AWS = require('aws-sdk')

const s3 = new AWS.S3()

AWS.config.getCredentials(async err => {
  if (err) console.log(err.stack)
  // credentials not loaded
  else {
    console.log('Access key:', AWS.config.credentials.profile)
    console.log('Region: ', AWS.config.region)
  }
})

// Set the region
AWS.config.update({region: 'us-east-1'})

// Create the parameters for calling createBucket
const bucketParams = {
  Bucket: process.argv[2],
}

// call S3 to create the bucket
s3.createBucket(bucketParams, async (err, data) => {
  if (err) {
    console.log('Error', err)
  } else {
    console.log('Success', data.Location)
  }
  console.log(await s3.listBuckets().promise())
})
