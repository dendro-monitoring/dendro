package main

import (
	"fmt"

	"github.com/aws/aws-sdk-go/service/timestreamwrite"
)

func mongoLogErrors(pRecord *RawRecord) {
	name := fetch(pRecord, "name")
	measureValue := fetchMV(pRecord)

	if keyExists(*pRecord, "parsed") {
		parsed := (*pRecord)["parsed"].(map[string]interface{})
		severity := fetch(&parsed, "s")

		if severity == "F" {
			fmt.Println("[MONGO] Error: Fatal mongo error")
		}
	}

	if name == "up" && measureValue == "0.0" {
		fmt.Println("[MONGO] Error: Mongo server is down")
	}
}

func buildMongoLogRecord(pRecord *RawRecord) {
	record := *pRecord

	var dimensions []*timestreamwrite.Dimension
	var timestamp string
	severity := "null" // TODO

	dimensions = appendDimension(pRecord, dimensions, "host")

	if keyExists(record, "parsed") {
		parsed := record["parsed"].(map[string]interface{})

		if keyExists(record, "component") {
			dimensions = append(dimensions, dimension("component", parsed["c"].(string)))
		}

		if keyExists(record, "context") {
			dimensions = append(dimensions, dimension("context", parsed["ctx"].(string)))
		}

		if keyExists(record, "message") {
			dimensions = append(dimensions, dimension("message", parsed["msg"].(string)))
		}

		severity = fetch(pRecord, "s")
	}

	timestamp = fetch(pRecord, "timestamp")

	unixTime := toUnix(timestamp)
	timeUnit := timestreamwrite.TimeUnitSeconds

	measureName := "severity"
	measureValue := severity
	measureValueType := "VARCHAR"

	mongoLogErrors(pRecord)

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

	mongoLogErrors(pRecord)

	mongoMetricRecords = append(mongoMetricRecords, &timestreamwrite.Record{
		Dimensions:       dimensions,
		MeasureName:      &measureName,
		MeasureValueType: &measureValueType,
		MeasureValue:     &measureValue,
		Time:             &unixTime,
		TimeUnit:         &timeUnit,
	})
}
