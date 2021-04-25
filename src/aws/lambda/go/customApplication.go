package main

func buildCustomAppRecord(record *RawRecord) {
	customAppRecords = append(customAppRecords, buildGenericRecord(record))
}
