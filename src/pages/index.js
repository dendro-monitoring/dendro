import Sidebar from '../components/sidebar';
import TrafficList from "../components/traffic";
import ServicesList from "../components/Services/List";
import EventList from '../components/Events/List';

export default function Home() {
  const logs = [
    {
      timestamp: 1618341535723,
      message: '2021-04-13T19:18:55.723Z\tundefined\tINFO\tLoading function\n',
      ingestionTime: 1618341544834
    },
    {
      timestamp: 1618341535995,
      message: 'START RequestId: d7a260c7-d557-4bf9-895d-0e1a010bed94 Version: $LATEST\n',
      ingestionTime: 1618341544834
    },
    {
      timestamp: 1618341535997,
      message: '2021-04-13T19:18:55.997Z\td7a260c7-d557-4bf9-895d-0e1a010bed94\tINFO\tReceived event: {\n' +
        '  "Records": [\n' +
        '    {\n' +
        '      "eventVersion": "2.1",\n' +
        '      "eventSource": "aws:s3",\n' +
        '      "awsRegion": "us-east-2",\n' +
        '      "eventTime": "2021-04-13T18:23:57.987Z",\n' +
        '      "eventName": "ObjectCreated:Put",\n' +
        '      "userIdentity": {\n' +
        '        "principalId": "AWS:AROAQN6E3H2J4QJ35ISPS:AWSFirehoseToS3"\n' +
        '      },\n' +
        '      "requestParameters": {\n' +
        '        "sourceIPAddress": "13.58.143.25"\n' +
        '      },\n' +
        '      "responseElements": {\n' +
        '        "x-amz-request-id": "5EA811P5JZ6752PS",\n' +
        '        "x-amz-id-2": "ApRziy1MPCTmbkRXPncyoPztowSxYVyZzcOwFBtQLRHqDFmdceuym41gV/yr52p8W+DA2bOGyGawvyhNLt9NlEWD6YQ6wHPr"\n' +
        '      },\n' +
        '      "s3": {\n' +
        '        "s3SchemaVersion": "1.0",\n' +
        '        "configurationId": "980d3836-055a-4ed0-93ed-13e66581087a",\n' +
        '        "bucket": {\n' +
        '          "name": "dendro-test-bucket-safe-delete",\n' +
        '          "ownerIdentity": {\n' +
        '            "principalId": "AK0RL2E0Z8LWU"\n' +
        '          },\n' +
        '          "arn": "arn:aws:s3:::dendro-test-bucket-safe-delete"\n' +
        '        },\n' +
        '        "object": {\n' +
        '          "key": "2021/04/13/18/DendroTestStream-1-2021-04-13-18-22-57-0cbecd0e-b8ff-49cb-86bc-9948d8626ca5",\n' +
        '          "size": 59381,\n' +
        '          "eTag": "c8471b19280f9eb3c1cb4a31d520aef7",\n' +
        '          "sequencer": "006075E1BF8A1A7C44"\n' +
        '        }\n' +
        '      }\n' +
        '    }\n' +
        '  ]\n' +
        '}\n',
      ingestionTime: 1618341544834
    },
    {
      timestamp: 1618341536683,
      message: '2021-04-13T19:18:56.666Z\td7a260c7-d557-4bf9-895d-0e1a010bed94\tINFO\tWriting records\n',
      ingestionTime: 1618341544834
    },
    {
      timestamp: 1618341537925,
      message: '2021-04-13T19:18:57.925Z\td7a260c7-d557-4bf9-895d-0e1a010bed94\tINFO\tWrite records successful\n',
      ingestionTime: 1618341544834
    },
    {
      timestamp: 1618341537931,
      message: '2021-04-13T19:18:57.931Z\td7a260c7-d557-4bf9-895d-0e1a010bed94\tINFO\tWrite records successful\n',
      ingestionTime: 1618341544834
    },
    {
      timestamp: 1618341537959,
      message: '2021-04-13T19:18:57.958Z\td7a260c7-d557-4bf9-895d-0e1a010bed94\tINFO\tWrite records successful\n',
      ingestionTime: 1618341544834
    },
    {
      timestamp: 1618341537964,
      message: 'END RequestId: d7a260c7-d557-4bf9-895d-0e1a010bed94\n',
      ingestionTime: 1618341544834
    },
    {
      timestamp: 1618341537964,
      message: 'REPORT RequestId: d7a260c7-d557-4bf9-895d-0e1a010bed94\tDuration: 1968.35 ms\tBilled Duration: 1969 ms\tMemory Size: 128 MB\tMax Memory Used: 92 MB\tInit Duration: 418.17 ms\t\n',
      ingestionTime: 1618341544834
    }
  ];

  return (
    <div className="App h-screen flex overflow-hidden bg-gray-100">
      <Sidebar />
      <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">

        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
            Performance Snapshot
            </h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">
              <TrafficList />
            </div>
          </div>
        </div>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
            Monitored Services
            </h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">
              <ServicesList />
            </div>
          </div>
        </div>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Activity Log</h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">
              <EventList logs={logs} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// export async function getServerSideProps() {
//   // const res = await fetch('http://localhost:3000/api/logs');
//   // const { logs } = await res.json();
//   const logs = [
//     {
//       timestamp: 1618341535723,
//       message: '2021-04-13T19:18:55.723Z\tundefined\tINFO\tLoading function\n',
//       ingestionTime: 1618341544834
//     },
//     {
//       timestamp: 1618341535995,
//       message: 'START RequestId: d7a260c7-d557-4bf9-895d-0e1a010bed94 Version: $LATEST\n',
//       ingestionTime: 1618341544834
//     },
//     {
//       timestamp: 1618341535997,
//       message: '2021-04-13T19:18:55.997Z\td7a260c7-d557-4bf9-895d-0e1a010bed94\tINFO\tReceived event: {\n' +
//         '  "Records": [\n' +
//         '    {\n' +
//         '      "eventVersion": "2.1",\n' +
//         '      "eventSource": "aws:s3",\n' +
//         '      "awsRegion": "us-east-2",\n' +
//         '      "eventTime": "2021-04-13T18:23:57.987Z",\n' +
//         '      "eventName": "ObjectCreated:Put",\n' +
//         '      "userIdentity": {\n' +
//         '        "principalId": "AWS:AROAQN6E3H2J4QJ35ISPS:AWSFirehoseToS3"\n' +
//         '      },\n' +
//         '      "requestParameters": {\n' +
//         '        "sourceIPAddress": "13.58.143.25"\n' +
//         '      },\n' +
//         '      "responseElements": {\n' +
//         '        "x-amz-request-id": "5EA811P5JZ6752PS",\n' +
//         '        "x-amz-id-2": "ApRziy1MPCTmbkRXPncyoPztowSxYVyZzcOwFBtQLRHqDFmdceuym41gV/yr52p8W+DA2bOGyGawvyhNLt9NlEWD6YQ6wHPr"\n' +
//         '      },\n' +
//         '      "s3": {\n' +
//         '        "s3SchemaVersion": "1.0",\n' +
//         '        "configurationId": "980d3836-055a-4ed0-93ed-13e66581087a",\n' +
//         '        "bucket": {\n' +
//         '          "name": "dendro-test-bucket-safe-delete",\n' +
//         '          "ownerIdentity": {\n' +
//         '            "principalId": "AK0RL2E0Z8LWU"\n' +
//         '          },\n' +
//         '          "arn": "arn:aws:s3:::dendro-test-bucket-safe-delete"\n' +
//         '        },\n' +
//         '        "object": {\n' +
//         '          "key": "2021/04/13/18/DendroTestStream-1-2021-04-13-18-22-57-0cbecd0e-b8ff-49cb-86bc-9948d8626ca5",\n' +
//         '          "size": 59381,\n' +
//         '          "eTag": "c8471b19280f9eb3c1cb4a31d520aef7",\n' +
//         '          "sequencer": "006075E1BF8A1A7C44"\n' +
//         '        }\n' +
//         '      }\n' +
//         '    }\n' +
//         '  ]\n' +
//         '}\n',
//       ingestionTime: 1618341544834
//     },
//     {
//       timestamp: 1618341536683,
//       message: '2021-04-13T19:18:56.666Z\td7a260c7-d557-4bf9-895d-0e1a010bed94\tINFO\tWriting records\n',
//       ingestionTime: 1618341544834
//     },
//     {
//       timestamp: 1618341537925,
//       message: '2021-04-13T19:18:57.925Z\td7a260c7-d557-4bf9-895d-0e1a010bed94\tINFO\tWrite records successful\n',
//       ingestionTime: 1618341544834
//     },
//     {
//       timestamp: 1618341537931,
//       message: '2021-04-13T19:18:57.931Z\td7a260c7-d557-4bf9-895d-0e1a010bed94\tINFO\tWrite records successful\n',
//       ingestionTime: 1618341544834
//     },
//     {
//       timestamp: 1618341537959,
//       message: '2021-04-13T19:18:57.958Z\td7a260c7-d557-4bf9-895d-0e1a010bed94\tINFO\tWrite records successful\n',
//       ingestionTime: 1618341544834
//     },
//     {
//       timestamp: 1618341537964,
//       message: 'END RequestId: d7a260c7-d557-4bf9-895d-0e1a010bed94\n',
//       ingestionTime: 1618341544834
//     },
//     {
//       timestamp: 1618341537964,
//       message: 'REPORT RequestId: d7a260c7-d557-4bf9-895d-0e1a010bed94\tDuration: 1968.35 ms\tBilled Duration: 1969 ms\tMemory Size: 128 MB\tMax Memory Used: 92 MB\tInit Duration: 418.17 ms\t\n',
//       ingestionTime: 1618341544834
//     }
//   ];

//   return {
//     props: { logs }
//   };
// }
