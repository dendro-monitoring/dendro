package main

func buildMongoLogRecord(record *RawRecord) {
	mongoLogRecords = append(mongoLogRecords, buildGenericRecord(record))
}

func buildMongoMetricRecord(record *RawRecord) {
	mongoMetricRecords = append(mongoMetricRecords, buildGenericRecord(record))
}
