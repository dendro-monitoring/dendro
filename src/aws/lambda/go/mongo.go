package main

import (
	"github.com/aws/aws-sdk-go/service/timestreamwrite"
)

func buildMongoLogRecord(pRecord *RawRecord) {
	record := *pRecord

	host := func() interface{} {
		return record["host"].(string)
	}
	component := func() interface{} {
		return record["parsed"].(RawRecord)["c"].(string)
	}
	context := func() interface{} {
		return record["parsed"].(RawRecord)["ctx"].(string)
	}
	message := func() interface{} {
		return record["parsed"].(RawRecord)["msg"].(string)
	}
	severity := func() interface{} {
		return record["parsed"].(RawRecord)["s"].(string)
	}
	timestamp := func() interface{} {
		return record["timestamp"].(string)
	}

	hostDimension := dimension("host", fetch(host))
	componentDimension := dimension("component", fetch(component))
	contextDimension := dimension("context", fetch(context))
	messageDimension := dimension("message", fetch(message))

	unixTime := toUnix(fetch(timestamp))
	timeUnit := timestreamwrite.TimeUnitSeconds

	measureName := "severity"
	measureValueType := "VARCHAR"
	measureValue := fetch(severity)

	mongoLogRecords = append(mongoLogRecords, &timestreamwrite.Record{
		Dimensions: []*timestreamwrite.Dimension{
			&hostDimension,
			&componentDimension,
			&contextDimension,
			&messageDimension,
		},
		MeasureName:      &measureName,
		MeasureValueType: &measureValueType,
		MeasureValue:     &measureValue,
		Time:             &unixTime,
		TimeUnit:         &timeUnit,
	})
}

func buildMongoMetricRecord(pRecord *RawRecord) {
	record := *pRecord

	host := func() interface{} {
		return record["host"].(string)
	}
	name := func() interface{} {
		return record["name"].(string)
	}
	timestamp := func() interface{} {
		return record["timestamp"].(string)
	}

	hostDimension := dimension("host", fetch(host))

	unixTime := toUnix(fetch(timestamp))
	timeUnit := timestreamwrite.TimeUnitSeconds

	measureName := fetch(name)
	measureValueType := "DOUBLE"
	measureValue := fetchMeasureValue(pRecord)

	mongoMetricRecords = append(mongoMetricRecords, &timestreamwrite.Record{
		Dimensions: []*timestreamwrite.Dimension{
			&hostDimension,
		},
		MeasureName:      &measureName,
		MeasureValueType: &measureValueType,
		MeasureValue:     &measureValue,
		Time:             &unixTime,
		TimeUnit:         &timeUnit,
	})
}
