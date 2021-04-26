package main

import (
	"fmt"
)

func fetch(toProcess func() interface{}) string {
	str := toProcess()
	switch str.(type) {
	case string:
		return str.(string)
	case nil:
		return ""
	default:
		return ""
	}
}

func keyExists(decoded map[string]interface{}, key string) bool {
	val, ok := decoded[key]
	return ok && val != nil
}

type RawRecord = map[string]interface{}

func main() {
	// body := `{
	// 	"file": "/var/log/postgresql/postgresql-13-main.log",
	// 	"host":"peter-ThinkPad-P51-W10DG",
	// 	"message": "2021-04-26 10:32:41.750 EDT [989] HINT:  Future log output will appear in directory \"log\".",
	// 	"source_type": "file",
	// 	"timestamp": "2021-04-26T16:13:16.762496506Z",
	// 	"type": "postgres-logs"
	// }`

	// var parsedBody RawRecord
	// err := json.Unmarshal(
	// 	[]byte(body),
	// 	&parsedBody,
	// )

	// if err != nil {
	// 	fmt.Println(err.Error())
	// 	os.Exit(3)
	// }

	// database := func() interface{} {
	// 	// i, ok := parsedBody["database"].(string)
	// 	// if ok {
	// 	// 	return i
	// 	// }
	// 	// return "fail"
	// 	return
	// }

	// var database string
	// if keyExists(parsedBody, "database") {
	// 	database = parsedBody["database"].(string)
	// } else {
	// 	database = ""
	// }
	var test string

	fmt.Println(test == "")
}
