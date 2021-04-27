package main

import (
	"fmt"
	"strconv"
	"time"

	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/timestreamwrite"
)

func keyExists(decoded map[string]interface{}, key string) bool {
	val, ok := decoded[key]
	return ok && val != nil && val != ""
}

func dimension(name string, val string) *timestreamwrite.Dimension {
	return &timestreamwrite.Dimension{
		Name:  &name,
		Value: &val,
	}
}

func fetch(record *RawRecord, key string) string {
	if keyExists((*record), key) {
		return (*record)[key].(string)
	}

	return ""
}

func appendDimension(
	pRecord *RawRecord,
	dimensions []*timestreamwrite.Dimension,
	key string,
) []*timestreamwrite.Dimension {
	record := *pRecord

	if keyExists(record, key) {
		return append(dimensions, dimension(key, record[key].(string)))
	}

	return dimensions
}

func toUnix(timestamp string) string {
	t, err := time.Parse(time.RFC3339, timestamp)
	if err != nil {
		fmt.Println(err)
		// If some error, just do time .now
		return fmt.Sprint(time.Now().Unix())
	}
	return fmt.Sprint(t.Unix())
}

func fetchMeasureValue(record *RawRecord) string {
	val, ok := (*record)["counter"]
	if ok {
		return fmt.Sprintf(
			"%f",
			val.(RawRecord)["value"].(float64),
		)
	}

	val, ok = (*record)["gauge"]
	if ok {
		return fmt.Sprintf(
			"%f",
			val.(RawRecord)["value"].(float64),
		)
	}

	fmt.Printf("\nError: No counter or gauge for record: %s", (*record)["name"])
	return ""
}

func buildRecordTypes(rawRecords *[]RawRecord) {
	for i := range *rawRecords {
		record := (*rawRecords)[i]

		switch record["type"] {
		case VECTOR_APACHE_ACCESS_LOGS_TYPE:
			buildApacheAccessLogRecord(&record)
		case VECTOR_APACHE_ERROR_LOGS_TYPE:
			buildApacheErrorLogRecord(&record)
		case VECTOR_APACHE_METRICS_TYPE:
			buildApacheMetricRecord(&record)
		case VECTOR_CUSTOM_APPLICATION_TYPE:
			buildCustomAppRecord(&record)
		case VECTOR_HOST_METRICS_TYPE:
			buildHostMetricRecord(&record)
		case VECTOR_MONGO_LOGS_TYPE:
			buildMongoLogRecord(&record)
		case VECTOR_MONGO_METRICS_TYPE:
			buildMongoMetricRecord(&record)
		case VECTOR_NGINX_ACCESS_LOGS_TYPE:
			buildNginxAccessLogRecord(&record)
		case VECTOR_NGINX_ERROR_LOGS_TYPE:
			buildNginxErrorLogRecord(&record)
		case VECTOR_NGINX_METRICS_TYPE:
			buildNginxMetricRecord(&record)
		case VECTOR_POSTGRES_LOGS_TYPE:
			buildPostgresLogRecord(&record)
		case VECTOR_POSTGRES_METRICS_TYPE:
			buildPostgresMetricRecord(&record)
		default:
			fmt.Printf("INVALID VECTOR RECORD TYPE: %s", record["type"])
		}
	}
}

func WriteRecords(
	recordInput *timestreamwrite.WriteRecordsInput,
	svc *timestreamwrite.TimestreamWrite,
	vectorType string,
) {
	_, err := svc.WriteRecords(recordInput)
	if err != nil {
		fmt.Println("Failed to write recoords.")
		fmt.Println(err.Error())
		// TODO: Should we panic and crash when we fail to write a batch?
		// panic(err)
		return
	}

	fmt.Printf(
		"Successfully wrote records for table: %s\n",
		vectorType,
	)
}

func writeAllRecords(
	recordContainer *RecordContainer,
	svc *timestreamwrite.TimestreamWrite,
) {
	records := recordContainer.records
	vectorType := recordContainer.vectorType

	totalLen := len(*records)

	if totalLen == 0 {
		return
	}

	fmt.Println("totalLen")

	fmt.Printf(
		"Writing %s records for table %s\n",
		strconv.Itoa(totalLen),
		vectorType,
	)

	for i := 0; i <= totalLen; i += 100 {
		recordInput := timestreamwrite.WriteRecordsInput{
			DatabaseName: &DATABASE_NAME,
			TableName:    &vectorType,
		}

		if totalLen-i-100 >= 0 {
			recordInput.SetRecords((*records)[i : i+100])
		} else {
			lenRemaining := totalLen - i
			recordInput.SetRecords((*records)[i : i+lenRemaining])
		}

		WriteRecords(
			&recordInput,
			svc,
			vectorType,
		)
	}
}

func writeAllRecordsTypes(rawRecords *[]RawRecord) {
	mySession := session.Must(session.NewSession())
	svc := timestreamwrite.New(mySession)

	buildRecordTypes(rawRecords)

	for i := range allRecords {
		writeAllRecords(&allRecords[i], svc)
	}
}
