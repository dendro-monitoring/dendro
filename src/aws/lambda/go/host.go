package main

func buildHostMetricRecord(record *RawRecord) {
	hostMetricRecords = append(hostMetricRecords, buildGenericRecord(record))
}
