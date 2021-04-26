package main

import "github.com/aws/aws-sdk-go/service/timestreamwrite"

func buildHostMetricRecord(pRecord *RawRecord) {
	record := *pRecord

	var host string
	var collector string
	var cpuCode string
	var cpuMode string
	var device string
	var fsFilesystem string
	var fsMountpoint string
	var name string
	var timestamp string

	var dimensions []*timestreamwrite.Dimension

	if keyExists(record, "host") {
		host = record["host"].(string)
		dimensions = append(dimensions, pDimension("host", host))
	}

	if keyExists(record, "tags") {
		tags := record["tags"].(map[string]interface{})

		if keyExists(tags, "collector") {
			collector = tags["collector"].(string)
			dimensions = append(dimensions, pDimension("collector", collector))
		}

		if keyExists(tags, "cpu") {
			cpuCode = tags["cpu"].(string)
			dimensions = append(dimensions, pDimension("cpuCode", cpuCode))
		}

		if keyExists(tags, "mode") {
			cpuMode = tags["mode"].(string)
			dimensions = append(dimensions, pDimension("cpuMode", cpuMode))
		}

		if keyExists(tags, "device") {
			device = tags["device"].(string)
			dimensions = append(dimensions, pDimension("device", device))
		}

		if keyExists(tags, "filesystem") {
			fsFilesystem = tags["filesystem"].(string)
			dimensions = append(dimensions, pDimension("filesystem", fsFilesystem))
		}

		if keyExists(tags, "mountpoint") {
			fsMountpoint = tags["mountpoint"].(string)
			dimensions = append(dimensions, pDimension("mountpoint", fsMountpoint))
		}
	}

	if keyExists(record, "timestamp") {
		timestamp = record["timestamp"].(string)
		dimensions = append(dimensions, pDimension("timestamp", timestamp))
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
