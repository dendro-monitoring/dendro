const AWS = require('aws-sdk')

const firehose = new AWS.Firehose()

function createDeliveryStream(DeliveryStreamName, BucketName, RoleARN) {
  return new Promise(resolve => {
    const params = {
      DeliveryStreamName, /* required */
      DeliveryStreamType: 'DirectPut',
      ExtendedS3DestinationConfiguration: {
        BucketARN: `arn:aws:s3:::${BucketName}`, /* required */
        RoleARN,
        //   // BufferingHints: {
        //   //   IntervalInSeconds: 'NUMBER_VALUE',
        //   //   SizeInMBs: 'NUMBER_VALUE',
        //   // },
        //   // CompressionFormat: UNCOMPRESSED | GZIP | ZIP | Snappy | HADOOP_SNAPPY,
        //   // DataFormatConversionConfiguration: {
        //   //   Enabled: true || false,
        //   //   InputFormatConfiguration: {
        //   //     Deserializer: {
        //   //       HiveJsonSerDe: {
        //   //         TimestampFormats: [
        //   //           'STRING_VALUE',
        //   //           /* more items */
        //   //         ],
        //   //       },
        //   //       OpenXJsonSerDe: {
        //   //         CaseInsensitive: true || false,
        //   //         ColumnToJsonKeyMappings: {
        //   //           '<NonEmptyStringWithoutWhitespace>': 'STRING_VALUE',
        //   //           /* '<NonEmptyStringWithoutWhitespace>': ... */
        //   //         },
        //   //         ConvertDotsInJsonKeysToUnderscores: true || false,
        //   //       },
        //   //     },
        //   //   },
        //   // OutputFormatConfiguration: {
        //   //   Serializer: {
        //   //     OrcSerDe: {
        //   //       BlockSizeBytes: 'NUMBER_VALUE',
        //   //       BloomFilterColumns: [
        //   //         'STRING_VALUE',
        //   //         /* more items */
        //   //       ],
        //   //       BloomFilterFalsePositiveProbability: 'NUMBER_VALUE',
        //   //       Compression: NONE | ZLIB | SNAPPY,
        //   //       DictionaryKeyThreshold: 'NUMBER_VALUE',
        //   //       EnablePadding: true || false,
        //   //       FormatVersion: V0_11 | V0_12,
        //   //       PaddingTolerance: 'NUMBER_VALUE',
        //   //       RowIndexStride: 'NUMBER_VALUE',
        //   //       StripeSizeBytes: 'NUMBER_VALUE',
        //   //     },
        //   //     ParquetSerDe: {
        //   //       BlockSizeBytes: 'NUMBER_VALUE',
        //   //       Compression: UNCOMPRESSED | GZIP | SNAPPY,
        //   //       EnableDictionaryCompression: true || false,
        //   //       MaxPaddingBytes: 'NUMBER_VALUE',
        //   //       PageSizeBytes: 'NUMBER_VALUE',
        //   //       WriterVersion: V1 | V2,
        //   //     },
        //   //   },
        //   // },
        //   // SchemaConfiguration: {
        //   //   CatalogId: 'STRING_VALUE',
        //   //   DatabaseName: 'STRING_VALUE',
        //   //   Region: 'STRING_VALUE',
        //   //   RoleARN: 'STRING_VALUE',
        //   //   TableName: 'STRING_VALUE',
        //   //   VersionId: 'STRING_VALUE',
        //   // },
        // },
        ErrorOutputPrefix: 'STRING_VALUE',
        // Prefix: 'STRING_VALUE',
        // ProcessingConfiguration: {
        //   Enabled: true || false,
        //   Processors: [
        //     {
        //       Type: Lambda, /* required */
        //       Parameters: [
        //         {
        //           ParameterName: LambdaArn | NumberOfRetries | RoleArn | BufferSizeInMBs | BufferIntervalInSeconds, /* required */
        //           ParameterValue: 'STRING_VALUE', /* required */
        //         },
        //         /* more items */
        //       ],
        //     },
        //     /* more items */
        //   ],
        // },
        // S3BackupConfiguration: {
        //   BucketARN: 'STRING_VALUE', /* required */
        //   RoleARN: 'STRING_VALUE', /* required */
        //   BufferingHints: {
        //     IntervalInSeconds: 'NUMBER_VALUE',
        //     SizeInMBs: 'NUMBER_VALUE',
        //   },
        //   CloudWatchLoggingOptions: {
        //     Enabled: true || false,
        //     LogGroupName: 'STRING_VALUE',
        //     LogStreamName: 'STRING_VALUE',
        //   },
        //   CompressionFormat: UNCOMPRESSED | GZIP | ZIP | Snappy | HADOOP_SNAPPY,
        //   EncryptionConfiguration: {
        //     KMSEncryptionConfig: {
        //       AWSKMSKeyARN: 'STRING_VALUE', /* required */
        //     },
        //     NoEncryptionConfig: NoEncryption,
        //   },
        //   ErrorOutputPrefix: 'STRING_VALUE',
        //   Prefix: 'STRING_VALUE',
        // },
        // S3BackupMode: Disabled | Enabled,
      },
    }
    firehose.createDeliveryStream(params, (err, data) => {
      if (err) throw new Error(err) // an error occurred
      else resolve(data)     // successful response
    })
  })
}

module.exports = createDeliveryStream
