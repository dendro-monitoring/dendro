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

	if keyExists(record, "host") {
		host = record["host"].(string)
	}

	if keyExists(record, "tags") {
		tags := record["collector"].(map[string]interface{})

		if keyExists(tags, "collector") {
			collector = tags["collector"].(string)
		}

		if keyExists(tags, "cpu") {
			cpuCode = tags["cpu"].(string)
		}

		if keyExists(tags, "mode") {
			cpuMode = tags["mode"].(string)
		}

		if keyExists(tags, "device") {
			device = tags["device"].(string)
		}

		if keyExists(tags, "filesystem") {
			fsFilesystem = tags["filesystem"].(string)
		}

		if keyExists(tags, "mountpoint") {
			fsMountpoint = tags["mountpoint"].(string)
		}
	}

	if keyExists(record, "name") {
		name = record["name"].(string)
	}

	if keyExists(record, "timestamp") {
		timestamp = record["timestamp"].(string)
	}

	hostDimension := dimension("host", host)
	collectorDimension := dimension("collector", collector)
	cpuCodeDimension := dimension("cpuCode", cpuCode)
	cpuModeDimension := dimension("cpuMode", cpuMode)
	deviceDimension := dimension("device", device)
	fsFilesystemDimension := dimension("filesystem", fsFilesystem)
	fsMountpointDimension := dimension("mountpoint", fsMountpoint)

	unixTime := toUnix(timestamp)
	timeUnit := timestreamwrite.TimeUnitSeconds

	measureName := name
	measureValueType := "VARCHAR"
	measureValue := fetchMeasureValue(pRecord)

	hostMetricRecords = append(hostMetricRecords, &timestreamwrite.Record{
		Dimensions: []*timestreamwrite.Dimension{
			&hostDimension,
			&collectorDimension,
			&cpuCodeDimension,
			&cpuModeDimension,
			&deviceDimension,
			&fsFilesystemDimension,
			&fsMountpointDimension,
		},
		MeasureName:      &measureName,
		MeasureValueType: &measureValueType,
		MeasureValue:     &measureValue,
		Time:             &unixTime,
		TimeUnit:         &timeUnit,
	})
}
