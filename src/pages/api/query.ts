import type { NextApiRequest, NextApiResponse } from 'next';
import query from '../../aws/orchestrator/timestream/query';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const q = JSON.parse(req.body).query;
    // const results = await query(q);
    const fakeResults = {
      Rows: [
        {
          Data: [
            { ScalarValue: "andrew-xps159560" },
            { ScalarValue: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36" },
            { ScalarValue: "0.0.0.0" },
            { ScalarValue: "GET" },
            { ScalarValue: "/my-path/manifest.json" },
            { ScalarValue: "https://my-url.com/my-path" },
            { ScalarValue: "504" },
            { ScalarValue: "0.002" },
            { ScalarValue: "500" },
            { ScalarValue: "statusCode" },
            { ScalarValue: "2021-05-25 15:42:46.000000000" }
          ]
        },
        {
          Data: [
            { ScalarValue: "andrew-xps159560" },
            { ScalarValue: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36" },
            { ScalarValue: "0.0.0.0" },
            { ScalarValue: "GET" },
            { ScalarValue: "/my-path/manifest.json" },
            { ScalarValue: "https://my-url.com/my-path" },
            { ScalarValue: "504" },
            { ScalarValue: "0.002" },
            { ScalarValue: "500" },
            { ScalarValue: "statusCode" },
            { ScalarValue: "2021-05-25 15:42:46.000000000" }
          ]
        },
        {
          Data: [
            { ScalarValue: "andrew-xps159560" },
            { ScalarValue: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36" },
            { ScalarValue: "0.0.0.0" },
            { ScalarValue: "GET" },
            { ScalarValue: "/my-path/manifest.json" },
            { ScalarValue: "https://my-url.com/my-path" },
            { ScalarValue: "504" },
            { ScalarValue: "0.002" },
            { ScalarValue: "500" },
            { ScalarValue: "statusCode" },
            { ScalarValue: "2021-05-25 15:42:46.000000000" }
          ]
        },
        {
          Data: [
            { ScalarValue: "andrew-xps159560" },
            { ScalarValue: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36" },
            { ScalarValue: "0.0.0.0" },
            { ScalarValue: "GET" },
            { ScalarValue: "/my-path/manifest.json" },
            { ScalarValue: "https://my-url.com/my-path" },
            { ScalarValue: "504" },
            { ScalarValue: "0.002" },
            { ScalarValue: "500" },
            { ScalarValue: "statusCode" },
            { ScalarValue: "2021-05-25 15:42:46.000000000" }
          ]
        },
        {
          Data: [
            { ScalarValue: "andrew-xps159560" },
            { ScalarValue: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36" },
            { ScalarValue: "0.0.0.0" },
            { ScalarValue: "GET" },
            { ScalarValue: "/my-path/manifest.json" },
            { ScalarValue: "https://my-url.com/my-path" },
            { ScalarValue: "504" },
            { ScalarValue: "0.002" },
            { ScalarValue: "500" },
            { ScalarValue: "statusCode" },
            { ScalarValue: "2021-05-25 15:42:46.000000000" }
          ]
        },
        {
          Data: [
            { ScalarValue: "andrew-xps159560" },
            { ScalarValue: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36" },
            { ScalarValue: "0.0.0.0" },
            { ScalarValue: "GET" },
            { ScalarValue: "/my-path/manifest.json" },
            { ScalarValue: "https://my-url.com/my-path" },
            { ScalarValue: "504" },
            { ScalarValue: "0.002" },
            { ScalarValue: "500" },
            { ScalarValue: "statusCode" },
            { ScalarValue: "2021-05-25 15:42:46.000000000" }
          ]
        },
        {
          Data: [
            { ScalarValue: "andrew-xps159560" },
            { ScalarValue: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36" },
            { ScalarValue: "0.0.0.0" },
            { ScalarValue: "GET" },
            { ScalarValue: "/my-path/manifest.json" },
            { ScalarValue: "https://my-url.com/my-path" },
            { ScalarValue: "504" },
            { ScalarValue: "0.002" },
            { ScalarValue: "500" },
            { ScalarValue: "statusCode" },
            { ScalarValue: "2021-05-25 15:42:46.000000000" }
          ]
        },
        {
          Data: [
            { ScalarValue: "andrew-xps159560" },
            { ScalarValue: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36" },
            { ScalarValue: "0.0.0.0" },
            { ScalarValue: "GET" },
            { ScalarValue: "/my-path/manifest.json" },
            { ScalarValue: "https://my-url.com/my-path" },
            { ScalarValue: "504" },
            { ScalarValue: "0.002" },
            { ScalarValue: "500" },
            { ScalarValue: "statusCode" },
            { ScalarValue: "2021-05-25 15:42:46.000000000" }
          ]
        },
        {
          Data: [
            { ScalarValue: "andrew-xps159560" },
            { ScalarValue: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36" },
            { ScalarValue: "0.0.0.0" },
            { ScalarValue: "GET" },
            { ScalarValue: "/my-path/manifest.json" },
            { ScalarValue: "https://my-url.com/my-path" },
            { ScalarValue: "504" },
            { ScalarValue: "0.002" },
            { ScalarValue: "500" },
            { ScalarValue: "statusCode" },
            { ScalarValue: "2021-05-25 15:42:46.000000000" }
          ]
        },
        {
          Data: [
            { ScalarValue: "andrew-xps159560" },
            { ScalarValue: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36" },
            { ScalarValue: "0.0.0.0" },
            { ScalarValue: "GET" },
            { ScalarValue: "/my-path/manifest.json" },
            { ScalarValue: "https://my-url.com/my-path" },
            { ScalarValue: "504" },
            { ScalarValue: "0.002" },
            { ScalarValue: "500" },
            { ScalarValue: "statusCode" },
            { ScalarValue: "2021-05-25 15:42:46.000000000" }
          ]
        }
      ],
      ColumnInfo: [
        { Name: "host", Type: { ScalarType: 'VARCHAR' } },
        { Name: "agent", Type: { ScalarType: 'VARCHAR' } },
        { Name: "ip", Type: { ScalarType: 'VARCHAR' } },
        { Name: "method", Type: { ScalarType: 'VARCHAR' } },
        { Name: "path", Type: { ScalarType: 'VARCHAR' } },
        { Name: "referer", Type: { ScalarType: 'VARCHAR' } },
        { Name: "bytes_out", Type: { ScalarType: 'VARCHAR' } },
        { Name: "request_time", Type: { ScalarTypex: 'VARCHAR' } },
        { Name: 'measure_value::varchar', Type: { ScalarType: 'VARCHAR' } },
        { Name: 'measure_name', Type: { ScalarType: 'VARCHAR' } },
        { Name: 'time', Type: { ScalarType: 'TIMESTAMP' } }
      ]
    }
    res.status(200).json({ data: fakeResults });
  } catch (e) {
    console.log(e);
    res.status(500).json({ data: {} });
  }
};
