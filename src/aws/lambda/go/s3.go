package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

func fetchS3Object(bucket string, key string) *s3.GetObjectOutput {
	mySession := session.Must(session.NewSession())
	svc := s3.New(mySession)

	input := &s3.GetObjectInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(key),
	}

	result, err := svc.GetObject(input)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(3)
	}

	return result
}

func getS3ObjectBody(buffer io.ReadCloser) string {
	buf := new(bytes.Buffer)
	buf.ReadFrom(buffer)
	return buf.String()
}

func getParsedS3ObjectBody(buffer io.ReadCloser) []map[string]interface{} {
	body := getS3ObjectBody(buffer)

	parseableBody := "[" + REGEX.ReplaceAllString(body, "},{") + "]"

	var parsedBody []map[string]interface{}
	err := json.Unmarshal(
		[]byte(parseableBody),
		&parsedBody,
	)

	if err != nil {
		fmt.Println(err.Error())
		os.Exit(3)
	}

	return parsedBody
}
