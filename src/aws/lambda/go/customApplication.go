package main

import (
	"encoding/json"

	"github.com/aws/aws-sdk-go/service/timestreamwrite"
)

func buildCustomAppRecord(record *RawRecord) {
	var dimensions []*timestreamwrite.Dimension
	var timestamp string

	dimensions = appendDimension(record, dimensions, "host")

	timestamp = fetch(record, "timestamp")

	unixTime := toUnix(timestamp)
	timeUnit := timestreamwrite.TimeUnitSeconds

	out, err := json.Marshal(record)
	if err != nil {
		panic(err)
	}

	measureName := "rawData"
	measureValue := string(out)
	measureValueType := "VARCHAR"

	customAppRecords = append(customAppRecords, &timestreamwrite.Record{
		Dimensions:       dimensions,
		MeasureName:      &measureName,
		MeasureValueType: &measureValueType,
		MeasureValue:     &measureValue,
		Time:             &unixTime,
		TimeUnit:         &timeUnit,
	})
}
