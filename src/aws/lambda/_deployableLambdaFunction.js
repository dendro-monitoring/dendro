/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const aws = require('aws-sdk');
const https = require('https');

/**
 * The regex used to match individual records.
 * Records coming in have no `,` so we replace any
 * `}{` with `},{` to make them json parsable
 */
const REGEX = /}{/gm;

const DATABASE_NAME = "DendroTimestreamDB";

/**
 * All the different vector types & database names
 */
const VECTOR_APACHE_LOGS_TYPE = "apache-logs";
const VECTOR_APACHE_METRICS_TYPE = "apache-metrics";
const VECTOR_CUSTOM_APPLICATION_TYPE = "custom-application";
const VECTOR_HOST_METRICS_TYPE = "host-metrics";
const VECTOR_MONGO_LOGS_TYPE = "mongo-logs";
const VECTOR_MONGO_METRICS_TYPE = "mongo-metrics";
const VECTOR_NGINX_LOGS_TYPE = "nginx-logs";
const VECTOR_NGINX_METRICS_TYPE = "nginx-metrics";
const VECTOR_POSTGRES_LOGS_TYPE = "postgres-logs";
const VECTOR_POSTGRES_METRICS_TYPE = "postgres-metrics";

const apacheLogRecords = [];
const apacheMetricRecords = [];
const customAppRecords = [];
const hostMetricRecords = [];
const mongoLogRecords = [];
const mongoMetricRecords = [];
const nginxLogRecords = [];
const nginxMetricRecords = [];
const postgresLogRecords = [];
const postgresMetricRecords = [];

/**
 * An array contain all record types.
 * We iterate on this to write all records to the db easily.
 */
const allRecords = [
  {
    type: VECTOR_APACHE_LOGS_TYPE,
    records: apacheLogRecords
  },
  {
    type: VECTOR_APACHE_METRICS_TYPE,
    records: apacheMetricRecords
  },
  {
    type: VECTOR_CUSTOM_APPLICATION_TYPE,
    records: customAppRecords
  },
  {
    type: VECTOR_HOST_METRICS_TYPE,
    records: hostMetricRecords
  },
  {
    type: VECTOR_MONGO_LOGS_TYPE,
    records: mongoLogRecords
  },
  {
    type: VECTOR_MONGO_METRICS_TYPE,
    records: mongoMetricRecords
  },
  {
    type: VECTOR_NGINX_LOGS_TYPE,
    records: nginxLogRecords
  },
  {
    type: VECTOR_NGINX_METRICS_TYPE,
    records: nginxMetricRecords
  },
  {
    type: VECTOR_POSTGRES_LOGS_TYPE,
    records: postgresLogRecords
  },
  {
    type: VECTOR_POSTGRES_METRICS_TYPE,
    records: postgresMetricRecords
  }
];

/**
 * Set up s3 client
 */
const s3 = new aws.S3({ apiVersion: '2006-03-01' });

/*
 * Configure timestream writeclient
 */
const agent = new https.Agent({
  maxSockets: 5000,
});
const writeClient = new aws.TimestreamWrite({
  maxRetries: 10,
  httpOptions: {
    timeout: 20000,
    agent,
  },
});

/**
 * The time injected into each record
 * TODO: Replace this with a records unique timestamp
 */
const currentTime = Date.now().toString();

function buildGenericRecord(record) {
  return {
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
    MeasureValue: JSON.stringify(record), // vector value
    MeasureValueType: 'VARCHAR',
    Time: currentTime.toString(),
  };
}

const buildApacheLogRecord = (record) => {
  apacheLogRecords.push(buildGenericRecord(record));
};

const buildApacheMetricRecord = (record) => {
  apacheMetricRecords.push(buildGenericRecord(record));
};

const buildCustomAppRecord = (record) => {
  customAppRecords.push(buildGenericRecord(record));
};

const buildHostMetricRecord = (record) => {
  hostMetricRecords.push(buildGenericRecord(record));
};

const buildMongoLogRecord = (record) => {
  mongoLogRecords.push(buildGenericRecord(record));
};

const buildMongoMetricRecord = (record) => {
  mongoMetricRecords.push(buildGenericRecord(record));
};

const buildNginxLogRecord = (record) => {
  nginxLogRecords.push(buildGenericRecord(record));
};

const buildNginxMetricRecord = (record) => {
  nginxMetricRecords.push(buildGenericRecord(record));
};

const buildPostgresLogRecord = (record) => {
  postgresLogRecords.push(buildGenericRecord(record));
};

const buildPostgresMetricRecord = (record) => {
  postgresMetricRecords.push(buildGenericRecord(record));
};

/**
 * Iterates through the records dividing them into their appropriate arrays
 *
 * @param {Object[]} rawData Records that were written to S3
 */
function buildRecordTypes(rawData) {
  rawData.forEach(record => {
    switch(record.type) {
      case VECTOR_APACHE_LOGS_TYPE:
        buildApacheLogRecord(record);
        break;
      case VECTOR_APACHE_METRICS_TYPE:
        buildApacheMetricRecord(record);
        break;
      case VECTOR_CUSTOM_APPLICATION_TYPE:
        buildCustomAppRecord(record);
        break;
      case VECTOR_HOST_METRICS_TYPE:
        buildHostMetricRecord(record);
        break;
      case VECTOR_MONGO_LOGS_TYPE:
        buildMongoLogRecord(record);
        break;
      case VECTOR_MONGO_METRICS_TYPE:
        buildMongoMetricRecord(record);
        break;
      case VECTOR_NGINX_LOGS_TYPE:
        buildNginxLogRecord(record);
        break;
      case VECTOR_NGINX_METRICS_TYPE:
        buildNginxMetricRecord(record);
        break;
      case VECTOR_POSTGRES_LOGS_TYPE:
        buildPostgresLogRecord(record);
        break;
      case VECTOR_POSTGRES_METRICS_TYPE:
        buildPostgresMetricRecord(record);
        break;
    }
  });
}

/**
 * Writes upto a 100 records to Timstream. Timestream can only accept upto
 * 100 records per write.
 *
 * @param {Object[]} records The records that will be written
 * @returns {Promise} The promise that records will be written to Timestream
 */
async function write100Records(records,  tablename) {
  const params = {
    DatabaseName: DATABASE_NAME,
    TableName: tablename,
    Records: records,
  };

  const request = writeClient.writeRecords(params);

  await request.promise().then(
    _data => {
      console.log('Write records successful');
    },
    err => {
      console.log('Error writing records:', err);
      if (err.code === 'RejectedRecordsException') {
        const responsePayload = JSON.parse(
          request.response.httpResponse.body.toString(),
        );
        console.log('RejectedRecords: ', responsePayload.RejectedRecords);
        console.log('Other records were written successfully. ');
      }
    },
  );
}

/**
 * Iterates on `allRecords`. If a record type contains records,
 * then write those records to Timestream.
 *
 * @param {Object[]} rawData - An array of records to write to Timestream
 * @returns {void}
 */
async function writeRecords(rawData) {
  console.log('Writing records');
  buildRecordTypes(rawData);

  const promises = [];
  allRecords.forEach((recordType) => {
    const { records, type } = recordType;

    if (records.length === 0) return;

    for (let i = 0; i <= records.length; i += 100) {
      promises.push(write100Records(records.slice(i, i + 100), type));
    }
  });

  await Promise.all(promises);
}

const getBucketName = event => event.Records[0].s3.bucket.name;
const getKey = event => decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

const getS3ObjectBody = s3Obj => s3Obj.Body.toString();
const getParsableS3ObjectBody = s3Obj => {
  const data = getS3ObjectBody(s3Obj).replace(REGEX, '},\n{');
  return `[${data}]`;
};

const getParsedS3ObjectBody = s3Obj => JSON.parse(getParsableS3ObjectBody(s3Obj));

exports.handler = async (event, _context) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  /*
   * Get the object from the event and show its content type
   */
  const bucket = getBucketName(event);
  const key = getKey(event);
  const params = {
    Bucket: bucket,
    Key: key,
  };

  let s3Obj;
  try {
    /*
     * Fetch obj from s3
     */
    s3Obj = await s3.getObject(params).promise();
  } catch (error) {
    console.log(error);

    const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
    console.log(message);

    throw new Error(message);
  }

  const body = getParsedS3ObjectBody(s3Obj);
  await writeRecords(body);

  return '';
};
