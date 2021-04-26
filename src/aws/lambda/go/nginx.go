package main

import "github.com/aws/aws-sdk-go/service/timestreamwrite"

func buildNginxAccessLogRecord(pRecord *RawRecord) {
	record := *pRecord

	var dimensions []*timestreamwrite.Dimension
	var timestamp string
	statusCode := "null" // TODO

	dimensions = appendDimension(pRecord, dimensions, "host")

	if keyExists(record, "parsed") {
		parsed := record["parsed"].(map[string]interface{})

		dimensions = appendDimension(&parsed, dimensions, "agent")
		dimensions = appendDimension(&parsed, dimensions, "client")
		dimensions = appendDimension(&parsed, dimensions, "method")
		dimensions = appendDimension(&parsed, dimensions, "path")
		dimensions = appendDimension(&parsed, dimensions, "referer")
		dimensions = appendDimension(&parsed, dimensions, "size")

		statusCode = fetch(pRecord, "status")
	}

	timestamp = fetch(pRecord, "timestamp")

	unixTime := toUnix(timestamp)
	timeUnit := timestreamwrite.TimeUnitSeconds

	measureName := "statusCode"
	measureValueType := "VARCHAR"
	measureValue := statusCode

	nginxAccessLogRecords = append(nginxAccessLogRecords, &timestreamwrite.Record{
		Dimensions:       dimensions,
		MeasureName:      &measureName,
		MeasureValueType: &measureValueType,
		MeasureValue:     &measureValue,
		Time:             &unixTime,
		TimeUnit:         &timeUnit,
	})
}

func buildNginxErrorLogRecord(pRecord *RawRecord) {
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

	nginxErrorLogRecords = append(nginxErrorLogRecords, &timestreamwrite.Record{
		Dimensions:       dimensions,
		MeasureName:      &measureName,
		MeasureValueType: &measureValueType,
		MeasureValue:     &measureValue,
		Time:             &unixTime,
		TimeUnit:         &timeUnit,
	})
}

func buildNginxMetricRecord(pRecord *RawRecord) {
	record := *pRecord

	var dimensions []*timestreamwrite.Dimension
	var name string
	var timestamp string

	dimensions = appendDimension(pRecord, dimensions, "host")

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

	nginxMetricRecords = append(nginxMetricRecords, &timestreamwrite.Record{
		Dimensions:       dimensions,
		MeasureName:      &measureName,
		MeasureValueType: &measureValueType,
		MeasureValue:     &measureValue,
		Time:             &unixTime,
		TimeUnit:         &timeUnit,
	})
}
