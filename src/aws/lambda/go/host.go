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

		if keyExists(tags, "cpu") {
			dimensions = append(dimensions, pDimension("cpuCode", tags["cpu"].(string)))
		}

		if keyExists(tags, "mode") {
			dimensions = append(dimensions, pDimension("cpuMode", tags["mode"].(string)))
		}
	}

	timestamp = fetch(pRecord, "timestamp")
	name = fetch(pRecord, "name")

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
