package main

import (
	"github.com/aws/aws-sdk-go/service/timestreamwrite"
)

func buildPostgresLogRecord(pRecord *RawRecord) {
	record := *pRecord

	var dimensions []*timestreamwrite.Dimension
	var timestamp string
	level := "null"

	dimensions = insertDimension(pRecord, dimensions, "host")
	dimensions = insertDimension(pRecord, dimensions, "database")
	dimensions = insertDimension(pRecord, dimensions, "code")
	dimensions = insertDimension(pRecord, dimensions, "message")
	dimensions = insertDimension(pRecord, dimensions, "host")

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
	measureValue := fetchMeasureValue(pRecord)
	measureValueType := "DOUBLE"

	postgresMetricRecords = append(postgresMetricRecords, &timestreamwrite.Record{
		Dimensions:       dimensions,
		MeasureName:      &measureName,
		MeasureValueType: &measureValueType,
		MeasureValue:     &measureValue,
		Time:             &unixTime,
		TimeUnit:         &timeUnit,
	})
}
