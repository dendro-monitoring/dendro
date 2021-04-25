package main

import "github.com/aws/aws-sdk-go/service/timestreamwrite"

func buildPostgresLogRecord(pRecord *RawRecord) {
	record := *pRecord

	host := func() interface{} {
		return record["host"].(string)
	}
	database := func() interface{} {
		return record["database"].(string)
	}
	code := func() interface{} {
		return record["code"].(string)
	}
	message := func() interface{} {
		return record["message"].(string)
	}
	timestamp := func() interface{} {
		return record["timestamp"].(string)
	}
	level := func() interface{} {
		return record["level"].(string)
	}

	hostDimension := dimension("host", fetch(host))
	databaseDimension := dimension("database", fetch(database))
	codeDimension := dimension("code", fetch(code))
	messageDimension := dimension("message", fetch(message))

	unixTime := toUnix(fetch(timestamp))
	timeUnit := timestreamwrite.TimeUnitSeconds

	measureName := "level"
	measureValueType := "VARCHAR"
	measureValue := fetch(level)

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
