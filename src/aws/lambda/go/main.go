package main

import (
	"context"
	"regexp"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/service/timestreamwrite"
)

type RecordContainer struct {
	vectorType string
	records    *[]*timestreamwrite.Record
}

type RawRecord = map[string]interface{}

/*
The regex used to match individual records.
Incoming have no `,` so we replace any
`}{` with `},{` to make them json parsable
*/
var REGEX *regexp.Regexp = regexp.MustCompile(`}{`)

var DATABASE_NAME string = "DendroTimestreamDB"

// All the different vector types & database names

const VECTOR_APACHE_ACCESS_LOGS_TYPE = "apache-access-logs"
const VECTOR_APACHE_ERROR_LOGS_TYPE = "apache-error-logs"
const VECTOR_APACHE_METRICS_TYPE = "apache-metrics"
const VECTOR_CUSTOM_APPLICATION_TYPE = "custom-application"
const VECTOR_HOST_METRICS_TYPE = "host-metrics"
const VECTOR_MONGO_LOGS_TYPE = "mongo-logs"
const VECTOR_MONGO_METRICS_TYPE = "mongo-metrics"
const VECTOR_NGINX_ACCESS_LOGS_TYPE = "nginx-access-logs"
const VECTOR_NGINX_ERROR_LOGS_TYPE = "nginx-error-logs"
const VECTOR_NGINX_METRICS_TYPE = "nginx-metrics"
const VECTOR_POSTGRES_LOGS_TYPE = "postgres-logs"
const VECTOR_POSTGRES_METRICS_TYPE = "postgres-metrics"

// Arrays for dividing the individual record types.

var apacheAccessLogRecords []*timestreamwrite.Record
var apacheErrorLogRecords []*timestreamwrite.Record
var apacheMetricRecords []*timestreamwrite.Record
var customAppRecords []*timestreamwrite.Record
var hostMetricRecords []*timestreamwrite.Record
var mongoLogRecords []*timestreamwrite.Record
var mongoMetricRecords []*timestreamwrite.Record
var nginxAccessLogRecords []*timestreamwrite.Record
var nginxErrorLogRecords []*timestreamwrite.Record
var nginxMetricRecords []*timestreamwrite.Record
var postgresLogRecords []*timestreamwrite.Record
var postgresMetricRecords []*timestreamwrite.Record

/*
An array contain all record types.
We iterate on this to write all records to the db easily.
*/
var allRecords []RecordContainer = []RecordContainer{
	{
		vectorType: VECTOR_APACHE_ACCESS_LOGS_TYPE,
		records:    &apacheAccessLogRecords,
	},
	{
		vectorType: VECTOR_APACHE_ERROR_LOGS_TYPE,
		records:    &apacheErrorLogRecords,
	},
	{
		vectorType: VECTOR_APACHE_METRICS_TYPE,
		records:    &apacheMetricRecords,
	},
	{
		vectorType: VECTOR_CUSTOM_APPLICATION_TYPE,
		records:    &customAppRecords,
	},
	{
		vectorType: VECTOR_HOST_METRICS_TYPE,
		records:    &hostMetricRecords,
	},
	{
		vectorType: VECTOR_MONGO_LOGS_TYPE,
		records:    &mongoLogRecords,
	},
	{
		vectorType: VECTOR_MONGO_METRICS_TYPE,
		records:    &mongoMetricRecords,
	},
	{
		vectorType: VECTOR_NGINX_ACCESS_LOGS_TYPE,
		records:    &nginxAccessLogRecords,
	},
	{
		vectorType: VECTOR_NGINX_ERROR_LOGS_TYPE,
		records:    &nginxErrorLogRecords,
	},
	{
		vectorType: VECTOR_NGINX_METRICS_TYPE,
		records:    &nginxMetricRecords,
	},
	{
		vectorType: VECTOR_POSTGRES_LOGS_TYPE,
		records:    &postgresLogRecords,
	},
	{
		vectorType: VECTOR_POSTGRES_METRICS_TYPE,
		records:    &postgresMetricRecords,
	},
}

func handler(ctx context.Context, s3Event events.S3Event) {
	for _, record := range s3Event.Records {
		s3 := record.S3
		bucket := s3.Bucket.Name
		key := s3.Object.Key

		s3Obj := fetchS3Object(bucket, key)
		body := getParsedS3ObjectBody(&s3Obj.Body)

		writeAllRecordsTypes(&body)
	}
}

func main() {
	lambda.Start(handler)
}
