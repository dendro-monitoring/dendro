package main

import (
	"context"
	"fmt"
	"strconv"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(ctx context.Context, s3Event events.S3Event) {
	for _, record := range s3Event.Records {
		s3 := record.S3
		var bucket string = s3.Bucket.Name
		var key string = s3.Object.Key

		s3Obj := fetchS3Object(bucket, key)
		body := getParsedS3ObjectBody(s3Obj.Body)

		fmt.Println(
			strconv.Itoa(len(body)),
		)

		writeRecords(&body)
	}
}

func main() {
	// Make the handler available for Remote Procedure Call by AWS Lambda
	lambda.Start(handler)
}
