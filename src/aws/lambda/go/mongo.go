package main

import (
	"github.com/aws/aws-sdk-go/service/timestreamwrite"
)

func buildMongoLogRecord(pRecord *RawRecord) {
	record := *pRecord

	var dimensions []*timestreamwrite.Dimension
	var timestamp string
	severity := "null" // TODO

	dimensions = insertDimension(pRecord, dimensions, "host")

	if keyExists(record, "parsed") {
		parsed := record["parsed"].(map[string]interface{})

		if keyExists(record, "component") {
			dimensions = append(dimensions, pDimension("component", parsed["c"].(string)))
		}

		if keyExists(record, "context") {
			dimensions = append(dimensions, pDimension("context", parsed["ctx"].(string)))
		}

		if keyExists(record, "message") {
			dimensions = append(dimensions, pDimension("message", parsed["msg"].(string)))
		}

		if keyExists(record, "severity") {
			severity = record["s"].(string)
		}
	}

	if keyExists(record, "timestamp") {
		timestamp = record["timestamp"].(string)
	}

	unixTime := toUnix(timestamp)
	timeUnit := timestreamwrite.TimeUnitSeconds

	measureName := "severity"
	measureValue := severity
	measureValueType := "VARCHAR"

	mongoLogRecords = append(mongoLogRecords, &timestreamwrite.Record{
		Dimensions:       dimensions,
		MeasureName:      &measureName,
		MeasureValueType: &measureValueType,
		MeasureValue:     &measureValue,
		Time:             &unixTime,
		TimeUnit:         &timeUnit,
	})
}

func buildMongoMetricRecord(pRecord *RawRecord) {
	record := *pRecord

	var dimensions []*timestreamwrite.Dimension
	var name string
	var timestamp string

	dimensions = insertDimension(pRecord, dimensions, "host")

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

	mongoMetricRecords = append(mongoMetricRecords, &timestreamwrite.Record{
		Dimensions:       dimensions,
		MeasureName:      &measureName,
		MeasureValueType: &measureValueType,
		MeasureValue:     &measureValue,
		Time:             &unixTime,
		TimeUnit:         &timeUnit,
	})
}
