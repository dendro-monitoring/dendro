package main

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"strconv"
	"time"

	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/timestreamwrite"
)

func keyExists(decoded map[string]interface{}, key string) bool {
	val, ok := decoded[key]
	return ok && val != nil
}

func dimension(name string, val string) timestreamwrite.Dimension {
	return timestreamwrite.Dimension{
		Name:  &name,
		Value: &val,
	}
}

func pDimension(name string, val string) *timestreamwrite.Dimension {
	dim := dimension(name, val)
	return &dim
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

func fetch(toProcess func() interface{}) string {
	str := toProcess()
	switch str.(type) {
	case string:
		return str.(string)
	default:
		return ""
	}
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

// TODO: Is this pass by value?
func buildGenericRecord(record *RawRecord) *timestreamwrite.Record {
	name1 := "host"
	val1 := "hello-world"
	dim1 := timestreamwrite.Dimension{
		Name:  &name1,
		Value: &val1,
	}

	name2 := "IP"
	val2 := "192.168.1.1"
	dim2 := timestreamwrite.Dimension{
		Name:  &name2,
		Value: &val2,
	}

	name3 := "RANDOMNUMBER"
	val3 := strconv.Itoa(rand.Int())
	dim3 := timestreamwrite.Dimension{
		Name:  &name3,
		Value: &val3,
	}

	measureName := "rawData"
	measureValueType := "VARCHAR"
	unixTime := fmt.Sprint(time.Now().Unix())
	timeUnit := timestreamwrite.TimeUnitSeconds

	out, err := json.Marshal(record)
	if err != nil {
		panic(err)
	}
	measureValue := string(out)

	return &timestreamwrite.Record{
		Dimensions:       []*timestreamwrite.Dimension{&dim1, &dim2, &dim3},
		MeasureName:      &measureName,
		MeasureValueType: &measureValueType,
		MeasureValue:     &measureValue,
		Time:             &unixTime,
		TimeUnit:         &timeUnit,
	}
}

func buildRecordTypes(rawRecords *[]RawRecord) {
	for i := range *rawRecords {
		record := (*rawRecords)[i]

		// TODO: Check if key was missing?
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
		fmt.Println(err)
		panic(err)
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
