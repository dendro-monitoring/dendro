package main

import (
	"fmt"

	"github.com/aws/aws-sdk-go/service/timestreamwrite"
)

func buildPostgresLogRecord(pRecord *RawRecord) {
	var dimensions []*timestreamwrite.Dimension
	var timestamp string
	level := "null"

	dimensions = insertDimension(pRecord, dimensions, "host")
	dimensions = insertDimension(pRecord, dimensions, "database")
	dimensions = insertDimension(pRecord, dimensions, "code")
	dimensions = insertDimension(pRecord, dimensions, "message")
	dimensions = insertDimension(pRecord, dimensions, "host")

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

	dimensions = insertDimension(pRecord, dimensions, "host")

	if keyExists(record, "tags") {
		tags := record["tags"].(map[string]interface{})

		if keyExists(tags, "db") {
			database := tags["db"].(string)
			dimensions = append(dimensions, pDimension("database", database))
		}
	}

	for i := range dimensions {
		fmt.Println(dimensions[i])
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
