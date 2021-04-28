package main

import "github.com/aws/aws-sdk-go/service/timestreamwrite"

func buildNginxAccessLogRecord(pRecord *RawRecord) {
	var dimensions []*timestreamwrite.Dimension
	var timestamp string
	statusCode := "null" // TODO

	dimensions = appendDimension(pRecord, dimensions, "host")

	dimensions = appendDimension(pRecord, dimensions, "agent")
	dimensions = appendDimension(pRecord, dimensions, "ip")
	dimensions = appendDimension(pRecord, dimensions, "method")
	dimensions = appendDimension(pRecord, dimensions, "path")
	dimensions = appendDimension(pRecord, dimensions, "referer")
	dimensions = appendDimension(pRecord, dimensions, "bytes_out")
	dimensions = appendDimension(pRecord, dimensions, "request_time")

	statusCode = fetch(pRecord, "status")

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
	var dimensions []*timestreamwrite.Dimension
	var timestamp string
	severity := "null" // TODO

	dimensions = appendDimension(pRecord, dimensions, "host")
	dimensions = appendDimension(pRecord, dimensions, "client")
	dimensions = appendDimension(pRecord, dimensions, "server")
	dimensions = appendDimension(pRecord, dimensions, "message")
	dimensions = appendDimension(pRecord, dimensions, "request")

	timestamp = fetch(pRecord, "timestamp")
	severity = fetch(pRecord, "severity")

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
	var dimensions []*timestreamwrite.Dimension
	var name string
	var timestamp string

	dimensions = appendDimension(pRecord, dimensions, "host")

	timestamp = fetch(pRecord, "timestamp")
	name = fetch(pRecord, "name")

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
