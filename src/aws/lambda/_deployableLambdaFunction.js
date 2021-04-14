/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable node/no-missing-require */
/* eslint-disable import/no-unresolved */

console.log('Loading function')

const aws = require('aws-sdk')

const s3 = new aws.S3({apiVersion: '2006-03-01'})
const https = require('https')

const REGEX = /}{/gm

/*
 * Configure timestream writeclient
 */
const agent = new https.Agent({
  maxSockets: 5000,
})
const writeClient = new aws.TimestreamWrite({
  maxRetries: 10,
  httpOptions: {
    timeout: 20000,
    agent,
  },
})

/**
 * Writes upto a 100 records to Timstream. Timestream can only accept upto
 * 100 records per write.
 *
 * @param {String[]} records The records that will be written
 * @returns {Promise} The promise that records will be written to Timestream
 */
async function write100Records(records) {
  const params = {
    DatabaseName: process.env.DATABASE_NAME,
    TableName: process.env.DATABASE_TABLE,
    Records: records,
  }

  const request = writeClient.writeRecords(params)

  await request.promise().then(
    _data => {
      console.log('Write records successful')
    },
    err => {
      console.log('Error writing records:', err)
      if (err.code === 'RejectedRecordsException') {
        const responsePayload = JSON.parse(
          request.response.httpResponse.body.toString(),
        )
        console.log('RejectedRecords: ', responsePayload.RejectedRecords)
        console.log('Other records were written successfully. ')
      }
    },
  )
}

/**
 * Writes all records to Timestream
 *
 * @param {Object[]} rawData - An array of records to write to Timestream
 * @returns {undefined}
 */
async function writeRecords(rawData) {
  console.log('Writing records')
  const currentTime = Date.now().toString() // Unix time in milliseconds

  let records = []

  rawData.forEach(evt => {
    records = records.concat({
      Dimensions: [
        {
          Name: 'host',
          Value: 'andrew-laptop',
        },
        {
          Name: 'IP',
          Value: '192.1.1.1',
        },
        /*
         * Generate a random number.
         * Timestream will reject data with exact same dimensions.
         */
        {
          Name: 'RANDOMNUMBER',
          Value: `${Math.random() + Math.random() + Math.random()}`,
        },
      ],
      MeasureName: 'rawData', // vector source
      MeasureValue: JSON.stringify(evt), // vector value
      MeasureValueType: 'VARCHAR',
      Time: currentTime.toString(),
    })
  })

  const promises = []
  for (let i = 0; i <= records.length; i += 100) {
    promises.push(write100Records(records.slice(i, i + 100)))
  }

  await Promise.all(promises)
}

const getBucketName = event => event.Records[0].s3.bucket.name
const getKey = event => decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '))

const getS3ObjectBody = s3Obj => s3Obj.Body.toString()
const getParsableS3ObjectBody = s3Obj => {
  const data = getS3ObjectBody(s3Obj).replace(REGEX, '},\n{')
  return `[${data}]`
}

const getParsedS3ObjectBody = s3Obj => JSON.parse(getParsableS3ObjectBody(s3Obj))

exports.handler = async (event, _context) => {
  console.log('Received event:', JSON.stringify(event, null, 2))

  /*
   * Get the object from the event and show its content type
   */
  const bucket = getBucketName(event)
  const key = getKey(event)
  const params = {
    Bucket: bucket,
    Key: key,
  }

  let s3Obj
  try {
    /*
     * Fetch obj from s3
     */
    s3Obj = await s3.getObject(params).promise()
  } catch (error) {
    console.log(error)

    const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`
    console.log(message)

    throw new Error(message)
  }

  const body = getParsedS3ObjectBody(s3Obj)
  await writeRecords(body)

  return ''
}
