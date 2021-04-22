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

// TODO: Is this pass by value?
func buildGenericRecord(record map[string]interface{}) *timestreamwrite.Record {
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

func buildApacheLogRecord(record map[string]interface{}) {
	apacheLogRecords = append(apacheLogRecords, buildGenericRecord(record))
}

func buildApacheMetricRecord(record map[string]interface{}) {
	apacheMetricRecords = append(apacheMetricRecords, buildGenericRecord(record))
}

func buildCustomAppRecord(record map[string]interface{}) {
	customAppRecords = append(customAppRecords, buildGenericRecord(record))
}

func buildHostMetricRecord(record map[string]interface{}) {
	hostMetricRecords = append(hostMetricRecords, buildGenericRecord(record))
}

func buildMongoLogRecord(record map[string]interface{}) {
	mongoLogRecords = append(mongoLogRecords, buildGenericRecord(record))
}

func buildMongoMetricRecord(record map[string]interface{}) {
	mongoMetricRecords = append(mongoMetricRecords, buildGenericRecord(record))
}

func buildNginxLogRecord(record map[string]interface{}) {
	nginxLogRecords = append(nginxLogRecords, buildGenericRecord(record))
}

func buildNginxMetricRecord(record map[string]interface{}) {
	nginxMetricRecords = append(nginxMetricRecords, buildGenericRecord(record))
}

func buildPostgresLogRecord(record map[string]interface{}) {
	postgresLogRecords = append(postgresLogRecords, buildGenericRecord(record))
}

func buildPostgresMetricRecord(record map[string]interface{}) {
	postgresMetricRecords = append(postgresMetricRecords, buildGenericRecord(record))
}

func buildRecordTypes(rawRecords *[]map[string]interface{}) {
	for i := range *rawRecords {
		record := (*rawRecords)[i]

		// TODO: Check if key was missing?
		switch record["type"] {
		case VECTOR_APACHE_LOGS_TYPE:
			buildApacheLogRecord(record)
		case VECTOR_APACHE_METRICS_TYPE:
			buildApacheMetricRecord(record)
		case VECTOR_CUSTOM_APPLICATION_TYPE:
			buildCustomAppRecord(record)
		case VECTOR_HOST_METRICS_TYPE:
			buildHostMetricRecord(record)
		case VECTOR_MONGO_LOGS_TYPE:
			buildMongoLogRecord(record)
		case VECTOR_MONGO_METRICS_TYPE:
			buildMongoMetricRecord(record)
		case VECTOR_NGINX_LOGS_TYPE:
			buildNginxLogRecord(record)
		case VECTOR_NGINX_METRICS_TYPE:
			buildNginxMetricRecord(record)
		case VECTOR_POSTGRES_LOGS_TYPE:
			buildPostgresLogRecord(record)
		case VECTOR_POSTGRES_METRICS_TYPE:
			buildPostgresMetricRecord(record)
		default:
			fmt.Printf("INVALID VECTOR RECORD TYPE: %s", record["type"])
		}
	}
}

func writeRecords(rawRecords *[]map[string]interface{}) {
	mySession := session.Must(session.NewSession())
	svc := timestreamwrite.New(mySession)

	buildRecordTypes(rawRecords)

	fmt.Printf(
		"Record count: %s",
		strconv.Itoa(len(hostMetricRecords)),
	)

	for i := range allRecords {
		currRecordContainer := allRecords[i]
		records := *currRecordContainer.records
		totalLen := len(records)

		if totalLen == 0 {
			continue
		}

		fmt.Printf(
			"\nWriting %s records for table %s",
			strconv.Itoa(totalLen),
			currRecordContainer.vectorType,
		)

		for i := 0; i <= totalLen; i += 100 {
			recordInput := timestreamwrite.WriteRecordsInput{
				DatabaseName: &DATABASE_NAME,
				TableName:    &currRecordContainer.vectorType,
			}

			if totalLen-i-100 >= 0 {
				recordInput.SetRecords(records[i : i+100])
			} else {
				lenRemaining := totalLen - i
				recordInput.SetRecords(records[i : i+lenRemaining])
			}

			_, err := svc.WriteRecords(&recordInput)
			if err != nil {
				fmt.Println(err)
				panic(err)
			}

			fmt.Printf(
				"\nSuccessfully wrote records for table: %s",
				currRecordContainer.vectorType,
			)
		}

	}
}
