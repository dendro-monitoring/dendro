package main

import "github.com/aws/aws-sdk-go/service/timestreamwrite"

func buildNginxAccessLogRecord(pRecord *RawRecord) {
	record := *pRecord

	host := func() interface{} {
		return record["host"].(string)
	}
	agent := func() interface{} {
		return record["parsed"].(RawRecord)["agent"].(string)
	}
	client := func() interface{} {
		return record["parsed"].(RawRecord)["client"].(string)
	}
	method := func() interface{} {
		return record["parsed"].(RawRecord)["method"].(string)
	}
	path := func() interface{} {
		return record["parsed"].(RawRecord)["path"].(string)
	}
	referer := func() interface{} {
		return record["parsed"].(RawRecord)["referer"].(string)
	}
	request := func() interface{} {
		return record["parsed"].(RawRecord)["request"].(string)
	}
	size := func() interface{} {
		return record["parsed"].(RawRecord)["size"].(string)
	}
	statusCode := func() interface{} {
		return record["parsed"].(RawRecord)["status"].(string)
	}
	timestamp := func() interface{} {
		return record["timestamp"].(string)
	}

	hostDimension := dimension("host", fetch(host))
	agentDimension := dimension("agent", fetch(agent))
	clientDimension := dimension("client", fetch(client))
	methodDimension := dimension("method", fetch(method))
	pathDimension := dimension("path", fetch(path))
	refererDimension := dimension("referer", fetch(referer))
	requestDimension := dimension("request", fetch(request))
	sizeDimension := dimension("size", fetch(size))

	unixTime := toUnix(fetch(timestamp))
	timeUnit := timestreamwrite.TimeUnitSeconds

	measureName := "statusCode"
	measureValueType := "VARCHAR"
	measureValue := fetch(statusCode)

	nginxAccessLogRecords = append(nginxAccessLogRecords, &timestreamwrite.Record{
		Dimensions: []*timestreamwrite.Dimension{
			&hostDimension,
			&agentDimension,
			&clientDimension,
			&methodDimension,
			&pathDimension,
			&refererDimension,
			&requestDimension,
			&sizeDimension,
		},
		MeasureName:      &measureName,
		MeasureValueType: &measureValueType,
		MeasureValue:     &measureValue,
		Time:             &unixTime,
		TimeUnit:         &timeUnit,
	})
}

func buildNginxErrorLogRecord(record *RawRecord) {
	nginxMetricRecords = append(nginxMetricRecords, buildGenericRecord(record))
}

func buildNginxMetricRecord(record *RawRecord) {
	nginxMetricRecords = append(nginxMetricRecords, buildGenericRecord(record))
}
