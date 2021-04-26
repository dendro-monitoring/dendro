package main

import (
	"github.com/aws/aws-sdk-go/service/timestreamwrite"
)

func buildPostgresLogRecord(pRecord *RawRecord) {
	record := *pRecord

	var host string
	var database string
	var code string
	var message string
	var timestamp string
	var level string

	if keyExists(record, "host") {
		host = record["host"].(string)
	}

	if keyExists(record, "database") {
		database = record["database"].(string)
	}

	if keyExists(record, "code") {
		code = record["code"].(string)
	}

	if keyExists(record, "message") {
		message = record["message"].(string)
	}

	if keyExists(record, "timestamp") {
		timestamp = record["timestamp"].(string)
	}

	if keyExists(record, "level") {
		level = record["level"].(string)
	}

	hostDimension := dimension("host", host)
	databaseDimension := dimension("database", database)
	codeDimension := dimension("code", code)
	messageDimension := dimension("message", message)

	unixTime := toUnix(timestamp)
	timeUnit := timestreamwrite.TimeUnitSeconds

	measureName := "level"
	measureValueType := "VARCHAR"
	measureValue := level

	postgresLogRecords = append(postgresLogRecords, &timestreamwrite.Record{
		Dimensions: []*timestreamwrite.Dimension{
			&hostDimension,
			&databaseDimension,
			&codeDimension,
			&messageDimension,
		},
		MeasureName:      &measureName,
		MeasureValueType: &measureValueType,
		MeasureValue:     &measureValue,
		Time:             &unixTime,
		TimeUnit:         &timeUnit,
	})
}

func buildPostgresMetricRecord(pRecord *RawRecord) {
	record := *pRecord

	host := func() interface{} {
		return record["host"].(string)
	}
	dbFunc := func() interface{} {
		return record["tags"].(RawRecord)["db"].(string)
	}
	name := func() interface{} {
		return record["name"].(string)
	}
	timestamp := func() interface{} {
		return record["timestamp"].(string)
	}

	hostDimension := dimension("host", fetch(host))
	dbDimension := dimension("database", fetch(dbFunc))

	unixTime := toUnix(fetch(timestamp))
	timeUnit := timestreamwrite.TimeUnitSeconds

	measureName := fetch(name)
	measureValueType := "DOUBLE"
	measureValue := fetchMeasureValue(pRecord)

	postgresMetricRecords = append(postgresMetricRecords, &timestreamwrite.Record{
		Dimensions: []*timestreamwrite.Dimension{
			&hostDimension,
			&dbDimension,
		},
		MeasureName:      &measureName,
		MeasureValueType: &measureValueType,
		MeasureValue:     &measureValue,
		Time:             &unixTime,
		TimeUnit:         &timeUnit,
	})
}
