package main

import (
	"fmt"

	"github.com/aws/aws-sdk-go/service/timestreamwrite"
)

func apacheLogErrors(pRecord *RawRecord) {
	severity := fetch(pRecord, "level")
	name := fetch(pRecord, "name")
	measureValue := fetchMV(pRecord)

	if keyExists(*pRecord, "parsed") {
		parsed := (*pRecord)["parsed"].(map[string]interface{})

		statusCode := fetch(&parsed, "status")

		if statusCode == "500" {
			fmt.Println("[APACHE] Error: Status code 500")
		}
	}

	if severity == "emerg" {
		fmt.Println("[APACHE] Error: Fatal apache error")
	}

	if name == "up" && measureValue == "0.0" {
		fmt.Println("[APACHE] Error: Apache web server is down")
	}
}

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

		statusCode = fetch(&parsed, "status")
	}

	timestamp = fetch(pRecord, "timestamp")

	unixTime := toUnix(timestamp)
	timeUnit := timestreamwrite.TimeUnitSeconds

	measureName := "statusCode"
	measureValueType := "VARCHAR"
	measureValue := statusCode

	apacheLogErrors(pRecord)

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
	var dimensions []*timestreamwrite.Dimension
	var timestamp string
	severity := "null" // TODO

	dimensions = appendDimension(pRecord, dimensions, "host")
	dimensions = appendDimension(pRecord, dimensions, "client")
	dimensions = appendDimension(pRecord, dimensions, "server")
	dimensions = appendDimension(pRecord, dimensions, "message")
	dimensions = appendDimension(pRecord, dimensions, "request")

	timestamp = fetch(pRecord, "timestamp")
	severity = fetch(pRecord, "level")
	if severity == "" {
		severity = "null"
	}

	unixTime := toUnix(timestamp)
	timeUnit := timestreamwrite.TimeUnitSeconds

	measureName := "severity"
	measureValueType := "VARCHAR"
	measureValue := severity

	apacheLogErrors(pRecord)

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
	var dimensions []*timestreamwrite.Dimension
	var name string
	var timestamp string

	dimensions = appendDimension(pRecord, dimensions, "host")
	dimensions = appendDimension(pRecord, dimensions, "state")

	timestamp = fetch(pRecord, "timestamp")
	name = fetch(pRecord, "name")

	unixTime := toUnix(timestamp)
	timeUnit := timestreamwrite.TimeUnitSeconds

	measureName := name
	measureValue := fetchMeasureValue(pRecord)
	measureValueType := "DOUBLE"

	apacheLogErrors(pRecord)

	apacheMetricRecords = append(apacheMetricRecords, &timestreamwrite.Record{
		Dimensions:       dimensions,
		MeasureName:      &measureName,
		MeasureValueType: &measureValueType,
		MeasureValue:     &measureValue,
		Time:             &unixTime,
		TimeUnit:         &timeUnit,
	})
}
