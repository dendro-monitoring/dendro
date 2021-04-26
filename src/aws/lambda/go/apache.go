package main

import "github.com/aws/aws-sdk-go/service/timestreamwrite"

// func buildApacheErrorLogRecord(record *RawRecord) {
// 	apacheErrorLogRecords = append(apacheErrorLogRecords, buildGenericRecord(record))
// }

// func buildApacheMetricRecord(record *RawRecord) {
// 	apacheMetricRecords = append(apacheMetricRecords, buildGenericRecord(record))
// }

func buildApacheAccessLogRecord(pRecord *RawRecord) {
	record := *pRecord

	var dimensions []*timestreamwrite.Dimension
	var timestamp string
	statusCode := "null" // TODO

	dimensions = appendDimension(pRecord, dimensions, "host")

	if keyExists(record, "parsed") {
		parsed := record["parsed"].(map[string]interface{})

		dimensions = appendDimension(&parsed, dimensions, "method")
		dimensions = appendDimension(&parsed, dimensions, "path")
		dimensions = appendDimension(&parsed, dimensions, "size")

		statusCode = fetch(pRecord, "status")
	}

	timestamp = fetch(pRecord, "timestamp")

	unixTime := toUnix(timestamp)
	timeUnit := timestreamwrite.TimeUnitSeconds

	measureName := "statusCode"
	measureValueType := "VARCHAR"
	measureValue := statusCode

	apacheAccessLogRecords = append(apacheAccessLogRecords, &timestreamwrite.Record{
		Dimensions:       dimensions,
		MeasureName:      &measureName,
		MeasureValueType: &measureValueType,
		MeasureValue:     &measureValue,
		Time:             &unixTime,
		TimeUnit:         &timeUnit,
	})
}

func buildApacheErrorLogRecord(pRecord *RawRecord) {
	record := *pRecord

	var dimensions []*timestreamwrite.Dimension
	var timestamp string
	severity := "null" // TODO

	dimensions = appendDimension(pRecord, dimensions, "host")
	dimensions = appendDimension(pRecord, dimensions, "client")
	dimensions = appendDimension(pRecord, dimensions, "server")
	dimensions = appendDimension(pRecord, dimensions, "message")
	dimensions = appendDimension(pRecord, dimensions, "request")

	if keyExists(record, "timestamp") {
		timestamp = record["timestamp"].(string)
	}

	if keyExists(record, "severity") {
		severity = record["severity"].(string)
	}

	unixTime := toUnix(timestamp)
	timeUnit := timestreamwrite.TimeUnitSeconds

	measureName := "severity"
	measureValueType := "VARCHAR"
	measureValue := severity

	apacheErrorLogRecords = append(apacheErrorLogRecords, &timestreamwrite.Record{
		Dimensions:       dimensions,
		MeasureName:      &measureName,
		MeasureValueType: &measureValueType,
		MeasureValue:     &measureValue,
		Time:             &unixTime,
		TimeUnit:         &timeUnit,
	})
}

func buildApacheMetricRecord(pRecord *RawRecord) {
	record := *pRecord

	var dimensions []*timestreamwrite.Dimension
	var name string
	var timestamp string

	dimensions = appendDimension(pRecord, dimensions, "host")
	dimensions = appendDimension(pRecord, dimensions, "type")
	dimensions = appendDimension(pRecord, dimensions, "state")

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

	apacheMetricRecords = append(apacheMetricRecords, &timestreamwrite.Record{
		Dimensions:       dimensions,
		MeasureName:      &measureName,
		MeasureValueType: &measureValueType,
		MeasureValue:     &measureValue,
		Time:             &unixTime,
		TimeUnit:         &timeUnit,
	})
}
