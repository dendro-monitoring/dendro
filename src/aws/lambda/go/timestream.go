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

func dimension(name string, val string) timestreamwrite.Dimension {
	return timestreamwrite.Dimension{
		Name:  &name,
		Value: &val,
	}
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

func fetchMeasureValue(record *map[string]interface{}) string {
	val, ok := (*record)["counter"]
	if ok {
		return fmt.Sprintf(
			"%f",
			val.(map[string]interface{})["value"].(float64),
		)
	}

	val, ok = (*record)["gauge"]
	if ok {
		return fmt.Sprintf(
			"%f",
			val.(map[string]interface{})["value"].(float64),
		)
	}

	fmt.Printf("\nError: No counter or gauge for record: %s", (*record)["name"])
	return ""
}

// TODO: Is this pass by value?
func buildGenericRecord(record *map[string]interface{}) *timestreamwrite.Record {
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

func buildApacheLogRecord(record *map[string]interface{}) {
	apacheLogRecords = append(apacheLogRecords, buildGenericRecord(record))
}

func buildApacheMetricRecord(record *map[string]interface{}) {
	apacheMetricRecords = append(apacheMetricRecords, buildGenericRecord(record))
}

func buildCustomAppRecord(record *map[string]interface{}) {
	customAppRecords = append(customAppRecords, buildGenericRecord(record))
}

func buildHostMetricRecord(record *map[string]interface{}) {
	hostMetricRecords = append(hostMetricRecords, buildGenericRecord(record))
}

func buildMongoLogRecord(record *map[string]interface{}) {
	mongoLogRecords = append(mongoLogRecords, buildGenericRecord(record))
}

func buildMongoMetricRecord(record *map[string]interface{}) {
	mongoMetricRecords = append(mongoMetricRecords, buildGenericRecord(record))
}

func buildNginxLogRecord(record *map[string]interface{}) {
	nginxLogRecords = append(nginxLogRecords, buildGenericRecord(record))
}

func buildNginxMetricRecord(record *map[string]interface{}) {
	nginxMetricRecords = append(nginxMetricRecords, buildGenericRecord(record))
}

func buildPostgresLogRecord(pRecord *map[string]interface{}) {
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

func buildPostgresMetricRecord(pRecord *map[string]interface{}) {
	record := *pRecord

	host := func() interface{} {
		return record["host"].(string)
	}
	dbFunc := func() interface{} {
		return record["tags"].(map[string]interface{})["db"].(string)
	}
	name := func() interface{} {
		return record["name"].(string)
	}
	timestamp := func() interface{} {
		return record["timestamp"].(string)
	}

	hostDimension := dimension("host", fetch(host))
	dbDimension := dimension("database", fetch(dbFunc))
	nameDimension := dimension("name", fetch(name))

	unixTime := toUnix(fetch(timestamp))
	timeUnit := timestreamwrite.TimeUnitSeconds

	measureName := fetch(name)
	measureValueType := "DOUBLE"
	measureValue := fetchMeasureValue(pRecord)

	postgresMetricRecords = append(postgresMetricRecords, &timestreamwrite.Record{
		Dimensions: []*timestreamwrite.Dimension{
			&hostDimension,
			&dbDimension,
			&nameDimension,
		},
		MeasureName:      &measureName,
		MeasureValueType: &measureValueType,
		MeasureValue:     &measureValue,
		Time:             &unixTime,
		TimeUnit:         &timeUnit,
	})
}

func buildRecordTypes(rawRecords *[]map[string]interface{}) {
	for i := range *rawRecords {
		record := (*rawRecords)[i]

		// TODO: Check if key was missing?
		switch record["type"] {
		case VECTOR_APACHE_LOGS_TYPE:
			buildApacheLogRecord(&record)
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
		case VECTOR_NGINX_LOGS_TYPE:
			buildNginxLogRecord(&record)
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

func writeAllRecordsTypes(rawRecords *[]map[string]interface{}) {
	mySession := session.Must(session.NewSession())
	svc := timestreamwrite.New(mySession)

	buildRecordTypes(rawRecords)

	for i := range allRecords {
		writeAllRecords(&allRecords[i], svc)
	}
}
