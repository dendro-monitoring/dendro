package main

import (
	"context"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(ctx context.Context, s3Event events.S3Event) {
	for _, record := range s3Event.Records {
		s3 := record.S3
		bucket := s3.Bucket.Name
		key := s3.Object.Key

		s3Obj := fetchS3Object(bucket, key)
		body := getParsedS3ObjectBody(&s3Obj.Body)

		writeAllRecordsTypes(&body)
	}
}

func main() {
	lambda.Start(handler)
}
