package main

import (
	"github.com/aws/aws-sdk-go/service/timestreamwrite"
)

func buildPostgresLogRecord(pRecord *RawRecord) {
	var dimensions []*timestreamwrite.Dimension
	var timestamp string
	level := "null"

	dimensions = appendDimension(pRecord, dimensions, "host")
	dimensions = appendDimension(pRecord, dimensions, "database")
	dimensions = appendDimension(pRecord, dimensions, "code")
	dimensions = appendDimension(pRecord, dimensions, "message")
	dimensions = appendDimension(pRecord, dimensions, "host")

	timestamp = fetch(pRecord, "timestamp")
	level = fetch(pRecord, "level")

	unixTime := toUnix(timestamp)
	timeUnit := timestreamwrite.TimeUnitSeconds

	measureName := "level"
	measureValue := level
	measureValueType := "VARCHAR"

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

	dimensions = appendDimension(pRecord, dimensions, "host")

	if keyExists(record, "tags") {
		tags := record["tags"].(map[string]interface{})

		if keyExists(tags, "db") {
			database := tags["db"].(string)
			dimensions = append(dimensions, dimension("database", database))
		}
	}

	timestamp = fetch(pRecord, "timestamp")
	name = fetch(pRecord, "name")

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
