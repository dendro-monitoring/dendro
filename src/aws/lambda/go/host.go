package main

import "github.com/aws/aws-sdk-go/service/timestreamwrite"

func buildHostMetricRecord(pRecord *RawRecord) {
	record := *pRecord
	var dimensions []*timestreamwrite.Dimension
	var name string
	var timestamp string

	dimensions = insertDimension(pRecord, dimensions, "host")

	if keyExists(record, "tags") {
		tags := record["tags"].(map[string]interface{})

		dimensions = insertDimension(&tags, dimensions, "collector")
		dimensions = insertDimension(&tags, dimensions, "device")
		dimensions = insertDimension(&tags, dimensions, "filesystem")
		dimensions = insertDimension(&tags, dimensions, "mountpoint")
		dimensions = insertDimension(&tags, dimensions, "host")
		dimensions = insertDimension(&tags, dimensions, "host")
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
	// TODO: If name doesn't exist, return? Record fails?
	measureValueType := "VARCHAR"
	measureValue := fetchMeasureValue(pRecord)

	hostMetricRecords = append(hostMetricRecords, &timestreamwrite.Record{
		Dimensions:       dimensions,
		MeasureName:      &measureName,
		MeasureValueType: &measureValueType,
		MeasureValue:     &measureValue,
		Time:             &unixTime,
		TimeUnit:         &timeUnit,
	})
}
