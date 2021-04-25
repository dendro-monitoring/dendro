package main

func buildApacheAccessLogRecord(record *RawRecord) {
	apacheAccessLogRecords = append(apacheAccessLogRecords, buildGenericRecord(record))
}

func buildApacheErrorLogRecord(record *RawRecord) {
	apacheErrorLogRecords = append(apacheErrorLogRecords, buildGenericRecord(record))
}

func buildApacheMetricRecord(record *RawRecord) {
	apacheMetricRecords = append(apacheMetricRecords, buildGenericRecord(record))
}
