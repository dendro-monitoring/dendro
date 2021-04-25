package main

import "github.com/aws/aws-sdk-go/service/timestreamwrite"

func buildHostMetricRecord(pRecord *RawRecord) {
	record := *pRecord

	host := func() interface{} {
		return record["host"].(string)
	}
	collector := func() interface{} {
		return record["tags"].(RawRecord)["collector"].(string)
	}
	cpuCode := func() interface{} {
		return record["tags"].(RawRecord)["cpu"].(string)
	}
	cpuMode := func() interface{} {
		return record["tags"].(RawRecord)["mode"].(string)
	}
	// Can be for network, disk or filesystem
	device := func() interface{} {
		return record["tags"].(RawRecord)["device"].(string)
	}
	fsFilesystem := func() interface{} {
		return record["tags"].(RawRecord)["filesystem"].(string)
	}
	fsMountpoint := func() interface{} {
		return record["tags"].(RawRecord)["mountpoint"].(string)
	}
	name := func() interface{} {
		return record["name"].(string)
	}
	timestamp := func() interface{} {
		return record["timestamp"].(string)
	}

	hostDimension := dimension("host", fetch(host))
	collectorDimension := dimension("collector", fetch(collector))
	cpuCodeDimension := dimension("cpuCode", fetch(cpuCode))
	cpuModeDimension := dimension("cpuMode", fetch(cpuMode))
	deviceDimension := dimension("device", fetch(device))
	fsFilesystemDimension := dimension("filesystem", fetch(fsFilesystem))
	fsMountpointDimension := dimension("mountpoint", fetch(fsMountpoint))

	unixTime := toUnix(fetch(timestamp))
	timeUnit := timestreamwrite.TimeUnitSeconds

	measureName := fetch(name)
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
