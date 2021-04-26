package main

import "github.com/aws/aws-sdk-go/service/timestreamwrite"

func buildNginxAccessLogRecord(pRecord *RawRecord) {
	record := *pRecord

	var dimensions []*timestreamwrite.Dimension
	var timestamp string
	statusCode := "null" // TODO

	dimensions = insertDimension(pRecord, dimensions, "host")

	if keyExists(record, "parsed") {
		parsed := record["parsed"].(map[string]interface{})

		dimensions = insertDimension(&parsed, dimensions, "agent")
		dimensions = insertDimension(&parsed, dimensions, "client")
		dimensions = insertDimension(&parsed, dimensions, "method")
		dimensions = insertDimension(&parsed, dimensions, "path")
		dimensions = insertDimension(&parsed, dimensions, "referer")
		dimensions = insertDimension(&parsed, dimensions, "request")
		dimensions = insertDimension(&parsed, dimensions, "size")

		if keyExists(parsed, "status") {
			statusCode = parsed["status"].(string)
		}
	}

	if keyExists(record, "timestamp") {
		timestamp = record["timestamp"].(string)
	}

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
	record := *pRecord

	host := func() interface{} {
		return record["host"].(string)
	}
	client := func() interface{} {
		return record["client"].(string)
	}
	server := func() interface{} {
		return record["server"].(string)
	}
	message := func() interface{} {
		return record["message"].(string)
	}
	request := func() interface{} {
		return record["request"].(string)
	}
	severity := func() interface{} {
		return record["severity"].(string)
	}
	timestamp := func() interface{} {
		return record["timestamp"].(string)
	}

	hostDimension := dimension("host", fetch(host))
	clientDimension := dimension("client", fetch(client))
	serverDimension := dimension("server", fetch(server))
	messageDimension := dimension("message", fetch(message))
	requestDimension := dimension("request", fetch(request))

	unixTime := toUnix(fetch(timestamp))
	timeUnit := timestreamwrite.TimeUnitSeconds

	measureName := "severity"
	measureValueType := "VARCHAR"
	measureValue := fetch(severity)

	nginxErrorLogRecords = append(nginxErrorLogRecords, &timestreamwrite.Record{
		Dimensions: []*timestreamwrite.Dimension{
			&hostDimension,
			&clientDimension,
			&serverDimension,
			&messageDimension,
			&requestDimension,
		},
		MeasureName:      &measureName,
		MeasureValueType: &measureValueType,
		MeasureValue:     &measureValue,
		Time:             &unixTime,
		TimeUnit:         &timeUnit,
	})
}

func buildNginxMetricRecord(pRecord *RawRecord) {
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

	nginxMetricRecords = append(nginxMetricRecords, &timestreamwrite.Record{
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
