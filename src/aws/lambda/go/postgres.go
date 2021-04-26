package main

import (
	"github.com/aws/aws-sdk-go/service/timestreamwrite"
)

func buildPostgresLogRecord(pRecord *RawRecord) {
	record := *pRecord

	var host string
	var database string
	var code string
	var message string
	var timestamp string
	var level string

	var dimensions []*timestreamwrite.Dimension

	if keyExists(record, "host") {
		host = record["host"].(string)
		dimensions = append(dimensions, pDimension("host", host))
	}

	if keyExists(record, "database") {
		database = record["database"].(string)
		dimensions = append(dimensions, pDimension("database", database))
	}

	if keyExists(record, "code") {
		code = record["code"].(string)
		dimensions = append(dimensions, pDimension("code", code))
	}

	if keyExists(record, "message") {
		message = record["message"].(string)
		dimensions = append(dimensions, pDimension("message", message))
	}

	if keyExists(record, "timestamp") {
		timestamp = record["timestamp"].(string)
	}

	// Measure value
	if keyExists(record, "level") {
		level = record["level"].(string)
	}

	unixTime := toUnix(timestamp)
	timeUnit := timestreamwrite.TimeUnitSeconds

	measureName := "level"
	measureValueType := "VARCHAR"
	measureValue := level

	postgresLogRecords = append(postgresLogRecords, &timestreamwrite.Record{
		Dimensions:       dimensions,
		MeasureName:      &measureName,
		MeasureValueType: &measureValueType,
		MeasureValue:     &measureValue,
		Time:             &unixTime,
		TimeUnit:         &timeUnit,
	})
}

func buildPostgresMetricRecord(pRecord *RawRecord) {
	record := *pRecord

	var name string
	var timestamp string
	var dimensions []*timestreamwrite.Dimension

	dimensions = insertDimension(pRecord, dimensions, "host")

	if keyExists(record, "tags") {
		tags := record["tags"].(map[string]interface{})

		if keyExists(tags, "db") {
			database := tags["db"].(string)
			dimensions = append(dimensions, pDimension("database", database))
		}
	}

	if keyExists(record, "timestamp") {
		timestamp = record["timestamp"].(string)
	}

	if keyExists(record, "name") {
		name = record["name"].(string)
	}

	unixTime := toUnix(timestamp)
	timeUnit := timestreamwrite.TimeUnitSeconds

	measureName := name
	measureValueType := "DOUBLE"
	measureValue := fetchMeasureValue(pRecord)

	postgresMetricRecords = append(postgresMetricRecords, &timestreamwrite.Record{
		Dimensions:       dimensions,
		MeasureName:      &measureName,
		MeasureValueType: &measureValueType,
		MeasureValue:     &measureValue,
		Time:             &unixTime,
		TimeUnit:         &timeUnit,
	})
}
